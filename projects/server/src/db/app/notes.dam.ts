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
import { Note, NoteSearch } from "common"
import client from "../client"
import names from "../names"
import { Document, WithId } from "mongodb"
import logger from "winston"

type NoteDoc = WithId<Note>

const col = client.app.collection<NoteDoc>(names.dbs.app.collections.notes)

async function init() {
  const exists = (await client.app.listCollections().toArray())
    .map(c => c.name)
    .includes(names.dbs.app.collections.notes)

  if (!exists)
    await client.app.createCollection(names.dbs.app.collections.notes)

  return await col.createIndexes([
    { name: "title_w_text", key: { title: "text", text: "text" } },
    { name: "user_id", key: { uid: 1 } },
    { name: "parent_task", key: { parent: 1 } },
  ])
}

async function get(filter: Filter<NoteDoc>): Promise<DBResult<NoteDoc>> {
  return runCatching("notes.dam.get", async () => {
    const res = await col.findOne(filter)
    return res ? successResultOf(res) : NoMatchResult
  })
}

function coerceSearch(search: NoteSearch): Document {
  const filter: Document = { ...search }
  if (search.text) filter.$text = { $search: search.text }
  logger.debug("search coerce", { filter })
  return filter
}

async function search(
  search: NoteSearch,
  options: SearchOptions = null,
): Promise<DBResult<NoteDoc[]>> {
  return runCatching("notes.dam.search", async () => {
    const res = await col.aggregate<NoteDoc>()
      .match(coerceSearch(search))
      .skip(options?.skip || 0)
      .limit(options?.limit || 50)
      .sort({ order: 1 })
      .toArray()
    return successResultOf(res)
  })
}

async function count(filter: Filter<NoteDoc>): Promise<DBResult<number>> {
  return runCatching("notes.dam.count", async () => {
    const count = await col.countDocuments(filter)
    return successResultOf(count)
  })
}

async function create(note: Note): Promise<DBResult<NoteDoc>> {
  return runCatching("notes.dam.create", async () => {
    const res = await col.insertOne({ _id: nanoid(), ...note })
    return res.insertedId ? get({ _id: res.insertedId }) : InternalFailureResult
  })
}

async function update(
  filter: Filter<Note>,
  packet: Partial<Note>,
): Promise<DBResult<NoteDoc>> {
  return runCatching("notes.dam.update", async () => {
    const res = await col.updateOne(filter, { $set: packet })
    if (!res.acknowledged) return InternalFailureResult
    if (res.matchedCount === 0) return NoMatchResult
    if (res.modifiedCount === 0) return InternalFailureResult
    return get(filter)
  })
}

export default {
  init, get, search, create, update, count,
  async deleteMany(filter: Filter<NoteDoc>): Promise<DBResult<number>> {
    return runCatching("notes.dam.deleteMany", async () => {
      const res = await col.deleteMany(filter)
      if (!res.acknowledged) return InternalFailureResult
      return successResultOf(res.deletedCount)
    })
  },
}
