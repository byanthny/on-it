import { nanoid } from "nanoid"
import {
  DBResult,
  Filter,
  InternalFailureResult,
  NoMatchResult,
  runCatching,
  SearchOptions,
  successResultOf,
} from "../types"
import { User, UserRole } from "common"
import client from "../client"
import names from "../names"
import { WithId } from "mongodb"
import logger from "winston"

type UserDoc = WithId<User> & { password: string }

const col = client.app.collection<UserDoc>(names.dbs.app.collections.users)

async function init() {
  const exists = (await client.app.listCollections().toArray())
    .map(c => c.name)
    .includes(names.dbs.app.collections.users)

  if (!exists) await client.app.createCollection(names.dbs.app.collections.users)

  return await col.createIndexes([
    { name: "email_unique", key: { email: 1 }, unique: true },
    { name: "role", key: { role: 1 } },
  ])
}

async function count(filter: Filter<UserDoc>): Promise<DBResult<number>> {
  return runCatching("user.dam.count", async () => {
    const count = await col.countDocuments(filter)
    return successResultOf(count)
  })
}

async function get(
  filter: Filter<UserDoc>,
  stripKeys: (keyof UserDoc)[] = [],
): Promise<DBResult<UserDoc>> {
  return runCatching("user.dam.get", async () => {
    const res = await col.findOne(filter)
    if (!res) return NoMatchResult
    for (let key of stripKeys) delete res[key]
    return successResultOf(res)
  })
}

async function search(
  filter: Filter<UserDoc>,
  options: SearchOptions = null,
  stripKeys: (keyof UserDoc)[] = [],
): Promise<DBResult<UserDoc[]>> {
  return runCatching("user.dam.search", async () => {
    const res = await col.aggregate<UserDoc>()
      .match(filter)
      .skip(options?.skip || 0)
      .limit(options?.limit || 50)
      .sort({ email: 1, "name.display": 1 })
      .map(d => {
        for (let key of stripKeys) delete d[key]
        return d
      })
      .toArray()
    return successResultOf(res)
  })
}

async function create(
  email: string,
  password: string,
  stripKeys: (keyof UserDoc)[] = [],
): Promise<DBResult<UserDoc>> {
  return runCatching("user.dam.create", async () => {
    const res = await col.insertOne({
      _id: nanoid(),
      email,
      password,
      role: UserRole.GENERIC,
    })
    if (!res.acknowledged) return InternalFailureResult
    return get({ _id: res.insertedId }, stripKeys)
  })
}

async function update(_id: string, packet: Partial<UserDoc>): Promise<DBResult<UserDoc>> {
  return runCatching("user.dam.update", async () => {
    const res = await col.updateOne({ _id }, { $set: packet })
    if (res.matchedCount === 0) return NoMatchResult
    else if (res.modifiedCount === 0) {
      logger.error("user.dam.update failed to modify")
      return InternalFailureResult
    } else return get({ _id })
  })
}

export default {
  init, get, search, create, update, count,
  async deleteMany(...ids: string[]): Promise<DBResult<number>> {
    return runCatching("users.dam.delete", async () => {
      const res = await col.deleteMany({ _id: { $in: ids } })
      if (!res.acknowledged) return InternalFailureResult
      if (res.deletedCount === 0) return NoMatchResult
      return successResultOf(res.deletedCount)
    })
  },
}
