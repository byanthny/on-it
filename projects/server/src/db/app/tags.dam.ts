import { WithId } from "mongodb"
import { Tag, TagSearch } from "common"
import names from "../names"
import client from "../client"
import { Filter, SearchOptions } from "../types"
import { nanoid } from "nanoid"
import { clearUndefinedOrNull } from "../../util"

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

async function create(uid: string, name: string, color?: string): Promise<TagDoc> {
  const res = await col.insertOne({ _id: nanoid(), name, color, uid })
  if (!res.insertedId) return null
  return await get({ _id: res.insertedId })
}

async function get(filter: Filter<TagDoc>): Promise<TagDoc> {
  return await col.findOne(filter)
}

function coerceSearch(search: TagSearch): Record<string, any> {
  const filter: Record<string, any> = {}
  if (search.uid) filter.uid = search.uid
  if (search.name) filter.$text = { $search: search.name }
  return filter
}

async function search(filter: TagSearch, options: SearchOptions): Promise<TagDoc[]> {
  return await col.aggregate<TagDoc>()
    .match(coerceSearch(filter))
    .skip(options?.skip || 0)
    .limit(options?.limit || 50)
    .toArray()
}

async function count(filter: Filter<TagDoc>): Promise<number> {
  return col.aggregate().match(filter).bufferedCount()
}

async function update(filter: Filter<TagDoc>, packet: Partial<Tag>): Promise<TagDoc> {
  const res = await col.updateOne(
    clearUndefinedOrNull(filter, ["_id", "uid"]),
    { $set: packet },
  )
  return res.acknowledged && res.matchedCount > 0 ? await get(filter) : null
}

export default {
  init, get, search, update, create, count,
  async delete(filter: Filter<TagDoc>): Promise<number> {
    const newFilter = clearUndefinedOrNull(filter)
    if (newFilter._id && Array.isArray(newFilter._id)) {
      newFilter._id = { $all: newFilter._id }
    }
    const res = await col.deleteMany(filter)
    return res.deletedCount
  },
}
