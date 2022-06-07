import { nanoid } from "nanoid"
import { DBResult, DBResultStatus, Filter, SearchOptions } from "../types"
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
  try {
    const count = await col.countDocuments(filter)
    return { status: DBResultStatus.SUCCESS, data: count }
  } catch (error) {
    logger.error("users.dam.count", { error })
    return { status: DBResultStatus.FAILURE_INTERNAL }
  }
}

async function get(
  filter: Filter<UserDoc>,
  stripKeys: (keyof UserDoc)[] = [],
): Promise<DBResult<UserDoc>> {
  try {
    const res = await col.findOne(filter)
    if (!res) return { status: DBResultStatus.FAILURE_NO_MATCH }
    for (let key of stripKeys) delete res[key]
    return { status: DBResultStatus.SUCCESS, data: res }
  } catch (error) {
    logger.error("user.dam.get", { error })
    return { status: DBResultStatus.FAILURE_INTERNAL }
  }
}

async function search(
  filter: Filter<UserDoc>,
  options: SearchOptions = null,
  stripKeys: (keyof UserDoc)[] = [],
): Promise<DBResult<UserDoc[]>> {
  try {
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

    return { status: DBResultStatus.SUCCESS, data: res }
  } catch (error) {
    logger.error("user.dam.search", { error })
    return { status: DBResultStatus.FAILURE_INTERNAL }
  }
}

async function create(email: string, password: string): Promise<DBResult<UserDoc>> {
  try {
    const res = await col.insertOne({
      _id: nanoid(),
      email,
      password,
      role: UserRole.GENERIC,
    })
    if (!res.acknowledged) return { status: DBResultStatus.FAILURE_INTERNAL }
    return get({ _id: res.insertedId })
  } catch (error) {
    logger.error("user.dam.create", { error })
    return { status: DBResultStatus.FAILURE_INTERNAL }
  }
}

async function update(_id: string, packet: Partial<UserDoc>): Promise<DBResult<UserDoc>> {
  delete packet._id
  try {
    const res = await col.updateOne({ _id }, { $set: packet })
    if (res.matchedCount === 0) return { status: DBResultStatus.FAILURE_NO_MATCH }
    else if (res.modifiedCount === 0) {
      logger.error("user.dam.update failed to modify")
      return { status: DBResultStatus.FAILURE_INTERNAL }
    } else return get({ _id })
  } catch (error) {
    logger.error("user.dam.update", { error })
    return { status: DBResultStatus.FAILURE_INTERNAL }
  }
}

export default {
  init, get, search, create, update, count,
  async deleteMany(...ids: string[]): Promise<DBResult<number>> {
    try {
      const res = await col.deleteMany({ _id: { $in: ids } })
      if (!res.acknowledged) return { status: DBResultStatus.FAILURE_INTERNAL }
      if (res.deletedCount === 0) return { status: DBResultStatus.FAILURE_NO_MATCH }
      return { status: DBResultStatus.SUCCESS, data: res.deletedCount }
    } catch (error) {
      logger.error("users.dam.delete", { error })
      return { status: DBResultStatus.FAILURE_INTERNAL }
    }
  },
}
