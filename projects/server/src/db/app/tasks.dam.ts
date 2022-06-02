import { nanoid } from "nanoid"
import { Filter, SearchOptions } from "../types"
import { Task, TaskSearch } from "common"
import client from "../client"
import names from "../names"
import { Document, WithId } from "mongodb"
import logger from "winston"

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
    { name: "due_date", key: { due: 1 }, sparse: true },
  ])
}

function coerceSearch(search: TaskSearch): Document {
  const out: Document = {}
  if (search.text) out.$text = { $search: search.text }
  if (search.parents)
    if (typeof search.parents === "string") out.parents = search.parents
    else out.parents = { $all: search.parents }
  if (search.due)
    out.due = {
      $lt: search.due?.before && new Date(search.due!.before),
      $gt: search.due?.after && new Date(search.due!.after),
    }
  logger.debug("search coercion", { search, out })
  return out
}

async function get(filter: Filter<TaskDoc>): Promise<TaskDoc> {
  return await col.findOne(filter)
}

async function search(
  search: TaskSearch,
  options: SearchOptions = null,
): Promise<TaskDoc[]> {
  return await col.aggregate<TaskDoc>()
    .match(coerceSearch(search))
    .skip(options?.skip || 0)
    .limit(options?.limit || 50)
    .sort({ email: 1, "name.display": 1 })
    .lookup({
      from: names.dbs.app.collections.tags,
      localField: "tags",
      foreignField: "_id",
      as: "tags",
    })
    .toArray()
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
