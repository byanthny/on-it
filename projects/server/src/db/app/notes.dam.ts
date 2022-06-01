import { nanoid } from "nanoid"
import { Filter, SearchOptions } from "../types"
import { Note } from "common"
import client from "../client"
import names from "../names"
import { WithId } from "mongodb"

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

async function get(filter: Filter<NoteDoc>): Promise<NoteDoc> {
  return await col.findOne(filter)
}

async function search(
  filter: Filter<NoteDoc>,
  options: SearchOptions = null,
): Promise<NoteDoc[]> {
  return await col.aggregate<NoteDoc>([
    { $match: filter },
    { $skip: options?.skip || 0 },
    { $limit: options?.limit || 50 },
    { sort: { order: 1 } },
  ]).toArray()
}

async function count(filter: Filter<NoteDoc>): Promise<number> {
  return col.aggregate().match(filter).bufferedCount()
}

async function create(note: Note): Promise<NoteDoc> {
  const res = await col.insertOne({ _id: nanoid(), ...note })
  if (!res.insertedId) return null
  return await get({ _id: res.insertedId })
}

async function update(_id: string, packet: Partial<Note>): Promise<NoteDoc> {
  delete packet._id
  const res = await col.findOneAndUpdate({ _id }, { $set: packet })
  return res.value
}

export default {
  init, get, search, create, update, count,
  async delete(filter: Filter<NoteDoc>): Promise<number> {
    const res = await col.deleteMany(filter)
    return res.deletedCount
  },
}
