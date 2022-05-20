import { nanoid } from "nanoid"
import { Document, SearchOptions } from "../types"
import { User } from "common"
import db from "../client"
import names from "../names"


type UserDoc = Document & User & { password: string }

const col = db.app.collection<UserDoc>(names.dbs.app.collections.users)

async function init() {
  const exists = (await db.app.listCollections().toArray())
    .map(c => c.name)
    .includes(names.dbs.app.collections.users)

  if (!exists)
    await db.app.createCollection(names.dbs.app.collections.users)

  return await col.createIndexes([
    { name: "email_unique", key: { email: 1 }, unique: true },
    { name: "full_name", key: { name: 1 } },
    { name: "role", key: { role: 1 } },
  ])
}

async function get(
  filter: Partial<UserDoc>,
  stripKeys: (keyof UserDoc)[] = ["password"],
): Promise<UserDoc> {
  const res = await col.findOne(filter)
  if (!res) return null
  for (let key of stripKeys) delete res[key]
  return res
}

async function search(
  filter: Partial<UserDoc>,
  options: SearchOptions = null,
  stripKeys: (keyof UserDoc)[] = [],
): Promise<UserDoc[]> {
  const res = await col.aggregate<UserDoc>([
    { $match: filter },
    { $skip: options?.skip || 0 },
    { $limit: options?.limit || 50 },
    { sort: { email: 1, "name.display": 1 } },
  ]).toArray()

  return res.map(d => {
    for (let key of stripKeys) delete d[key]
    return d
  })
}

async function create(email: string, password: string): Promise<UserDoc> {
  const res = await col.insertOne({ _id: nanoid(), email, password })
  if (!res.insertedId) return null
  return await get({ _id: res.insertedId })
}

async function update(_id: string, packet: Partial<UserDoc>): Promise<UserDoc> {
  delete packet._id
  await col.updateOne({ _id }, { $set: packet })
  return get({ _id })
}

export default {
  init, find: get, search, create, update,
  async delete(_id: string): Promise<boolean> {
    const res = await col.deleteOne({ _id })
    return res.acknowledged && res.deletedCount === 1
  },
}