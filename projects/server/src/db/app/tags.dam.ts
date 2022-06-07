import { WithId } from "mongodb"
import { Tag, TagSearch } from "common"
import names from "../names"
import client from "../client"
import { DBResult, DBResultStatus, Filter, SearchOptions } from "../types"
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
  try {
    const res = await col.insertOne({ _id: nanoid(), name, color, uid })
    if (!res.acknowledged) return { status: DBResultStatus.FAILURE_INTERNAL }
    return await get({ _id: res.insertedId })
  } catch (error) {
    logger.error("tags.dam.create", { error })
    return { status: DBResultStatus.FAILURE_INTERNAL }
  }
}

async function get(filter: Filter<TagDoc>): Promise<DBResult<TagDoc>> {
  try {
    const res = await col.findOne(filter)
    if (!res) return { status: DBResultStatus.FAILURE_NO_MATCH }
    return { status: DBResultStatus.SUCCESS, data: res }
  } catch (error) {
    logger.error("tags.dam.get", { error })
    return { status: DBResultStatus.FAILURE_INTERNAL }
  }

}

function coerceSearch(search: TagSearch): Record<string, any> {
  const filter: Record<string, any> = {}
  if (search.uid) filter.uid = search.uid
  if (search.name) filter.$text = { $search: search.name }
  return filter
}

async function search(filter: TagSearch,
  options: SearchOptions,
): Promise<DBResult<TagDoc[]>> {
  try {
    const res = await col.aggregate<TagDoc>()
      .match(coerceSearch(filter))
      .skip(options?.skip || 0)
      .limit(options?.limit || 50)
      .toArray()
    return { status: DBResultStatus.SUCCESS, data: res }
  } catch (error) {
    logger.error("tags.dam.search", { error })
    return { status: DBResultStatus.FAILURE_INTERNAL }
  }
}

async function count(filter: Filter<TagDoc>): Promise<DBResult<number>> {
  try {
    const count = await col.countDocuments(filter)
    return { status: DBResultStatus.SUCCESS, data: count }
  } catch (error) {
    logger.error("tags.dam.count", { error })
    return { status: DBResultStatus.FAILURE_INTERNAL }
  }
}

async function update(
  filter: Filter<TagDoc>,
  packet: Partial<Tag>,
): Promise<DBResult<TagDoc>> {
  try {
    const res = await col.updateOne(
      clearUndefinedOrNull(filter, ["_id", "uid"]),
      { $set: packet },
    )
    if (res.matchedCount === 0) return { status: DBResultStatus.FAILURE_NO_MATCH }
    if (!res.acknowledged || res.modifiedCount === 0)
      return { status: DBResultStatus.FAILURE_INTERNAL }
    return await get(filter)
  } catch (error) {
    logger.error("tags.dam.update", { error })
    return { status: DBResultStatus.FAILURE_INTERNAL }
  }
}

export default {
  init, get, search, update, create, count,
  async deleteMany(filter: Filter<TagDoc>): Promise<DBResult<number>> {
    try {
      const newFilter = clearUndefinedOrNull(filter)
      if (newFilter._id && Array.isArray(newFilter._id))
        newFilter._id = { $in: newFilter._id }
      const res = await col.deleteMany(filter)
      if (!res.acknowledged) return { status: DBResultStatus.FAILURE_INTERNAL }
      return { status: DBResultStatus.SUCCESS, data: res.deletedCount }
    } catch (error) {
      logger.error("tags.dam.delete", { error })
      return { status: DBResultStatus.FAILURE_INTERNAL }
    }
  },
}
