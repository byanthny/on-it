import { WithId } from "mongodb"
import { ID, Tag, TagSearch } from "common"
import names from "../names"
import client from "../client"
import {
  DBResult,
  DBResultStatus,
  Filter,
  InternalFailureResult,
  NoMatchResult,
  runCatching,
  SearchOptions,
  successResultOf,
} from "../types"
import { nanoid } from "nanoid"
import { clearUndefinedOrNull } from "../../util"
import logger from "winston"

type TagDoc = WithId<Tag>

const col = client.app.collection<TagDoc>(names.dbs.app.collections.tags)

async function init() {
  const exists = (await client.app.listCollections().toArray())
    .map(c => c.name)
    .includes(names.dbs.app.collections.tags)

  if (!exists)
    await client.app.createCollection(names.dbs.app.collections.tags)

  return await col.createIndexes([
    { name: "name", key: { name: "text" } },
    { name: "user_id", key: { uid: 1 } },
    { name: "user_tag_name_unique", key: { uid: 1, name: 1 }, unique: true },
  ])
}

async function create(uid: string,
  name: string,
  color?: string,
): Promise<DBResult<TagDoc>> {
  return runCatching("tags.dam.create", async () => {
    const res = await col.insertOne({ _id: nanoid(), name, color, uid })
    if (!res.acknowledged) return InternalFailureResult
    return await get({ _id: res.insertedId })
  })
}

async function get(filter: Filter<TagDoc>): Promise<DBResult<TagDoc>> {
  return runCatching("tags.dam.get", async () => {
    const res = await col.findOne(filter)
    if (!res) return NoMatchResult
    return successResultOf(res)
  })
}

function coerceSearch(search: TagSearch): Record<string, any> {
  const filter: Record<string, any> = {}
  if (search.uid) filter.uid = search.uid
  if (search.name) filter.$text = { $search: search.name }
  return filter
}

async function search(
  filter: TagSearch,
  options: SearchOptions,
): Promise<DBResult<TagDoc[]>> {
  return runCatching("tags.dam.search", async () => {
    const res = await col.aggregate<TagDoc>()
      .match(coerceSearch(filter))
      .skip(options?.skip || 0)
      .limit(options?.limit || 50)
      .toArray()
    return successResultOf(res)
  })
}

async function count(filter: Filter<TagDoc>): Promise<DBResult<number>> {
  return runCatching("tags.dam.count", async () => {
    const count = await col.countDocuments(filter)
    return { status: DBResultStatus.SUCCESS, data: count }
  })
}

async function update(
  filter: Filter<TagDoc>,
  packet: Partial<Tag>,
): Promise<DBResult<TagDoc>> {
  return runCatching("tags.dam.update", async () => {
    const res = await col.updateOne(
      clearUndefinedOrNull(filter, ["_id", "uid"]),
      { $set: packet },
    )
    if (res.matchedCount === 0) return NoMatchResult
    if (!res.acknowledged || res.modifiedCount === 0) {
      logger.error("failed to modify tag")
      return InternalFailureResult
    }
    return await get(filter)
  })
}

export default {
  init, get, search, update, create, count,
  async deleteManyByID(ids: string[], uid: ID): Promise<DBResult<number>> {
    return runCatching("tags.dam.deleteManyByID", async () => {
      const res = await col.deleteMany({ _id: { $in: ids }, uid })
      if (!res.acknowledged) return InternalFailureResult
      return successResultOf(res.deletedCount)
    })
  },
  async deleteMany(filter: Filter<TagDoc>): Promise<DBResult<number>> {
    return runCatching("tags.dam.delete", async () => {
      const newFilter = clearUndefinedOrNull(filter)
      if (newFilter._id && Array.isArray(newFilter._id))
        newFilter._id = { $in: newFilter._id }
      const res = await col.deleteMany(filter)
      if (!res.acknowledged) return InternalFailureResult
      return successResultOf(res.deletedCount)
    })
  },
}
