import client from "../client"
import { WithId } from "mongodb"
import { Limits, UserRole } from "common"
import names from "../names"

type LimitDoc = WithId<Limits>

const col = client.app.collection<LimitDoc>(names.dbs.app.collections.limits)

async function init() {
  const exists = (await client.app.listCollections().toArray())
    .map(c => c.name)
    .includes(names.dbs.app.collections.limits)

  if (!exists)
    await client.app.createCollection(names.dbs.app.collections.limits)

  return col.createIndexes([{
    name: "unique_role",
    key: { role: 1 },
    unique: true,
  }])
}

async function get(role: UserRole): Promise<LimitDoc> {
  return col.findOne({ role })
}

async function getAll(): Promise<LimitDoc[]> {
  return col.find().toArray()
}

async function upsert(role: UserRole, limits: Partial<Limits>): Promise<LimitDoc> {
  const res = await col.updateOne({ role }, { $set: limits }, { upsert: true })
  if (!res.acknowledged) return null
  return get(role)
}

export default { init, get, getAll, upsert }