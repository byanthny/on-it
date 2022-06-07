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
import { Tag, Task, TaskSearch } from "common"
import client from "../client"
import names from "../names"
import { Document, WithId } from "mongodb"
import logger from "winston"

type TaskDoc<T = string> = WithId<Task<T>>

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

const tagLookup = {
  from: names.dbs.app.collections.tags,
  localField: "tags",
  foreignField: "_id",
  as: "tags",
}

function coerceSearch(search: TaskSearch): Document {
  const out: Document = {}
  if (search.uid) out.uid = search.uid
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

async function count(filter: Filter<TaskDoc>): Promise<DBResult<number>> {
  return runCatching("tasks.dam.count", async () => {
    const count = await col.countDocuments(filter)
    return successResultOf(count)
  })
}

async function get(filter: Filter<TaskDoc>): Promise<DBResult<TaskDoc<Tag>>> {
  return runCatching("tasks.dam.get", async () => {
    const res = await col.aggregate<TaskDoc>()
      .match(filter)
      .lookup(tagLookup)
      .limit(1)
      .next()
    return res ? successResultOf(res) : NoMatchResult
  })
}

async function search(
  search: TaskSearch,
  options: SearchOptions = null,
): Promise<DBResult<TaskDoc<Tag>[]>> {
  return runCatching("tasks.dam.search", async () => {
    const res = await col.aggregate<TaskDoc>()
      .match(coerceSearch(search))
      .skip(options?.skip || 0)
      .limit(options?.limit || 50)
      .sort({ email: 1, "name.display": 1 })
      .lookup(tagLookup)
      .toArray()
    return successResultOf(res)
  })
}

async function create(task: Task): Promise<DBResult<TaskDoc<Tag>>> {
  return runCatching("tasks.dam.create", async () => {
    const res = await col.insertOne({ _id: nanoid(), ...task })
    if (!res.insertedId) return InternalFailureResult
    return await get({ _id: res.insertedId })
  })
}

async function update(
  filter: Filter<TaskDoc>,
  packet: Filter<Task>,
): Promise<DBResult<TaskDoc<Tag>>> {
  return runCatching("tasks.dam.update", async () => {
    const res = await col.updateOne(filter, { $set: packet })
    if (!res.acknowledged) return InternalFailureResult
    if (res.matchedCount === 0) return NoMatchResult
    if (res.modifiedCount === 0) return InternalFailureResult
    return get(filter)
  })
}

export default {
  init, get, search, create, update, count,
  async delete(filter: Filter<TaskDoc>): Promise<DBResult<void>> {
    return runCatching("tasks.dam.delete", async () => {
      const res = await col.deleteOne(filter)
      if (!res.acknowledged) return InternalFailureResult
      if (res.deletedCount === 0) return NoMatchResult
      return successResultOf()
    })
  },
  async deleteManyByID(...ids: string[]): Promise<DBResult<number>> {
    return runCatching("tasks.dam.deleteManyByID", async () => {
      const res = await col.deleteMany({ _id: { $in: ids } })
      if (!res.acknowledged) return InternalFailureResult
      return successResultOf(res.deletedCount)
    })
  },
  async deleteMany(filter: TaskSearch): Promise<DBResult<number>> {
    return runCatching("tasks.dam.deleteMany", async () => {
      const res = await col.deleteMany(coerceSearch(filter))
      if (!res.acknowledged) return InternalFailureResult
      return successResultOf(res.deletedCount)
    })
  },
}
