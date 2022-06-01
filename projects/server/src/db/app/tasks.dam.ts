import { nanoid } from "nanoid"
import { Filter, SearchOptions } from "../types"
import { Task } from "common"
import client from "../client"
import names from "../names"
import { WithId } from "mongodb"

type TaskDoc = WithId<Task>

const col = client.app.collection<TaskDoc>(names.dbs.app.collections.tasks)

async function init() {
  const exists = (await client.app.listCollections().toArray())
    .map(c => c.name)
    .includes(names.dbs.app.collections.tasks)

  if (!exists)
    await client.app.createCollection(names.dbs.app.collections.tasks)

  return await col.createIndexes([
    { name: "user_id", key: { uid: 1 } },
    { name: "title_w_description", key: { title: "text", description: "text" } },
    { name: "state", key: { state: 1 } },
    { name: "parents", key: { parent: 1 } },
    { name: "tags", key: { tags: 1 } },
    { name: "pinned", key: { pinned: 1 }, sparse: true },
  ])
}

async function get(filter: Filter<TaskDoc>): Promise<TaskDoc> {
  return await col.findOne(filter)
}

async function search(
  filter: Filter<TaskDoc>,
  options: SearchOptions = null,
): Promise<TaskDoc[]> {
  return await col.aggregate<TaskDoc>([
    { $match: filter },
    { $skip: options?.skip || 0 },
    { $limit: options?.limit || 50 },
    { sort: { email: 1, "name.display": 1 } },
  ]).toArray()
}

async function count(filter: Filter<TaskDoc>): Promise<number> {
  return col.aggregate().match(filter).bufferedCount()
}

async function create(task: Task): Promise<TaskDoc> {
  const res = await col.insertOne({ _id: nanoid(), ...task })
  if (!res.insertedId) return null
  return await get({ _id: res.insertedId })
}

async function update(_id: string, packet: Filter<Task>): Promise<TaskDoc> {
  delete packet._id
  const res = await col.findOneAndUpdate({ _id }, { $set: packet })
  return res.value
}

export default {
  init, get, search, create, update, count,
  async delete(filter: Filter<TaskDoc>): Promise<number> {
    const res = await col.deleteMany({ ...filter, parents: { $set: filter.parents } })
    return res.deletedCount
  },
}
