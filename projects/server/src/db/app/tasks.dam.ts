import { nanoid } from "nanoid"
import { DBResult, DBResultStatus, Filter, SearchOptions } from "../types"
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
  try {
    const count = await col.countDocuments(filter)
    return { status: DBResultStatus.SUCCESS, data: count }
  } catch (error) {
    logger.error("tasks.dam.count", { error })
    return { status: DBResultStatus.FAILURE_INTERNAL }
  }
}

async function get(filter: Filter<TaskDoc>): Promise<DBResult<TaskDoc<Tag>>> {
  try {
    const res = await col.aggregate<TaskDoc>()
      .match(filter)
      .lookup(tagLookup)
      .limit(1)
      .next()
    if (!res) return { status: DBResultStatus.FAILURE_NO_MATCH }
    return { status: DBResultStatus.SUCCESS, data: res }
  } catch (error) {
    logger.error("tasks.dam.get", { error })
    return { status: DBResultStatus.FAILURE_INTERNAL }
  }
}

async function search(
  search: TaskSearch,
  options: SearchOptions = null,
): Promise<DBResult<TaskDoc<Tag>[]>> {
  try {
    const res = await col.aggregate<TaskDoc>()
      .match(coerceSearch(search))
      .skip(options?.skip || 0)
      .limit(options?.limit || 50)
      .sort({ email: 1, "name.display": 1 })
      .lookup(tagLookup)
      .toArray()
    return { status: DBResultStatus.SUCCESS, data: res }
  } catch (error) {
    logger.error("tasks.dam.search", { error })
    return { status: DBResultStatus.FAILURE_INTERNAL }
  }
}

async function create(task: Task): Promise<DBResult<TaskDoc<Tag>>> {
  try {
    const res = await col.insertOne({ _id: nanoid(), ...task })
    if (!res.insertedId) return { status: DBResultStatus.FAILURE_INTERNAL }
    return await get({ _id: res.insertedId })
  } catch (error) {
    logger.error("tasks.dam.create", { error })
    return { status: DBResultStatus.FAILURE_INTERNAL }
  }
}

async function update(
  filter: Filter<TaskDoc>,
  packet: Filter<Task>,
): Promise<DBResult<TaskDoc<Tag>>> {
  try {
    const res = await col.updateOne(filter, { $set: packet })
    if (!res.acknowledged) return { status: DBResultStatus.FAILURE_INTERNAL }
    if (res.matchedCount === 0) return { status: DBResultStatus.FAILURE_NO_MATCH }
    if (res.modifiedCount === 0) return { status: DBResultStatus.FAILURE_INTERNAL }
    return get(filter)
  } catch (error) {
    logger.error("tasks.dam.update", { error })
    return { status: DBResultStatus.FAILURE_INTERNAL }
  }
}

export default {
  init, get, search, create, update, count,
  async delete(filter: Filter<TaskDoc>): Promise<DBResult<void>> {
    try {
      const res = await col.deleteOne(filter)
      if (!res.acknowledged) return { status: DBResultStatus.FAILURE_INTERNAL }
      if (res.deletedCount === 0) return { status: DBResultStatus.FAILURE_NO_MATCH }
      return { status: DBResultStatus.SUCCESS }
    } catch (error) {
      logger.error("tasks.dam.delete", { error })
      return { status: DBResultStatus.FAILURE_INTERNAL }
    }
  },
  async deleteMany(filter: TaskSearch): Promise<DBResult<number>> {
    try {
      const res = await col.deleteMany(coerceSearch(filter))
      if (!res.acknowledged) return { status: DBResultStatus.FAILURE_INTERNAL }
      return { status: DBResultStatus.SUCCESS, data: res.deletedCount }
    } catch (error) {
      logger.error("tasks.dam.deleteMany", { error })
      return { status: DBResultStatus.FAILURE_INTERNAL }
    }
  },
}
