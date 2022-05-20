import { nanoid } from "nanoid"
import { Document, SearchOptions } from "../types"
import { Task } from "common"
import db from "../client"
import names from "../names"


type TaskDoc = Document & Task

const col = db.app.collection<TaskDoc>(names.dbs.app.collections.tasks)

async function init() {
  const exists = (await db.app.listCollections().toArray())
    .map(c => c.name)
    .includes(names.dbs.app.collections.tasks)

  if (!exists)
    await db.app.createCollection(names.dbs.app.collections.tasks)

  return await col.createIndexes([
    { name: "parent_id", key: { parent: 1 } },
    { name: "tags", key: { tags: 1 } },
    { name: "user_id", key: { uid: 1 } },
  ])
}

async function get(filter: Partial<TaskDoc>): Promise<TaskDoc> {
  const res = await col.findOne(filter)
  if (!res) return null
  return res
}

async function search(
  filter: Partial<TaskDoc>,
  options: SearchOptions = null,
): Promise<TaskDoc[]> {
  return await col.aggregate<TaskDoc>([
    { $match: filter },
    { $skip: options?.skip || 0 },
    { $limit: options?.limit || 50 },
    { sort: { email: 1, "name.display": 1 } },
  ]).toArray()
}

async function create(task: Task): Promise<TaskDoc> {
  const res = await col.insertOne({ _id: nanoid(), ...task })
  if (!res.insertedId) return null
  return await get({ _id: res.insertedId })
}

async function update(_id: string, packet: Partial<Task>): Promise<TaskDoc> {
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