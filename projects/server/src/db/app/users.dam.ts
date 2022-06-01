import { nanoid } from "nanoid"
import { Filter, SearchOptions } from "../types"
import { User } from "common"
import client from "../client"
import names from "../names"
import { WithId } from "mongodb"

type UserDoc = WithId<User> & { password: string }

const col = client.app.collection<UserDoc>(names.dbs.app.collections.users)

async function init() {
  const exists = (await client.app.listCollections().toArray())
    .map(c => c.name)
    .includes(names.dbs.app.collections.users)

  if (!exists) await client.app.createCollection(names.dbs.app.collections.users)

  return await col.createIndexes([
    { name: "email_unique", key: { email: "text" }, unique: true },
    { name: "full_name", key: { name: "text" } },
  ])
}

async function get(
  filter: Filter<UserDoc>,
  stripKeys: (keyof UserDoc)[] = [],
): Promise<UserDoc> {
  const res = await col.findOne(filter)
  if (!res) return null
  for (let key of stripKeys) delete res[key]
  return res
}

async function search(
  filter: Filter<UserDoc>,
  options: SearchOptions = null,
  stripKeys: (keyof UserDoc)[] = [],
): Promise<UserDoc[]> {
  const res = await col.aggregate<UserDoc>()
    .match(filter)
    .skip(options?.skip || 0)
    .limit(options?.limit || 50)
    .sort({ email: 1, "name.display": 1 })
    .toArray()

  return res.map(d => {
    for (let key of stripKeys) delete d[key]
    return d
  })
}

async function count(filter: Filter<UserDoc>): Promise<number> {
  return col.aggregate().match(filter).bufferedCount()
}

async function create(email: string, password: string): Promise<UserDoc> {
  const res = await col.findOneAndUpdate(
    { _id: nanoid() },
    { $set: { email, password } },
    { upsert: true },
  )
  return res.value
}

async function update(_id: string, packet: Partial<UserDoc>): Promise<UserDoc> {
  delete packet._id
  const res = await col.findOneAndUpdate({ _id }, { $set: packet })
  return res.value
}

export default {
  init, get, search, create, update, count,
  async delete(filter: Filter<User>): Promise<number> {
    const res = await col.deleteMany(filter)
    return res.deletedCount
  },
}