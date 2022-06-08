import client from "../client"
import { WithId } from "mongodb"
import { Limits, UserRole } from "common"
import names from "../names"
import {
  DBResult,
  InternalFailureResult,
  NoMatchResult,
  runCatching,
  successResultOf,
} from "../types"

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

async function get(role: UserRole): Promise<DBResult<LimitDoc>> {
  return runCatching("limits.dam.get", async () => {
    const res = await col.findOne({ role })
    return res ? successResultOf(res) : NoMatchResult
  })
}

async function getAll(): Promise<DBResult<Record<UserRole, LimitDoc>>> {
  return runCatching("limits.dam.getAll", async () => {
    const res = await col.find().toArray()
    const map: Record<UserRole, LimitDoc> = {
      ADMIN: undefined, DEVELOPER: undefined, GENERIC: undefined,
    }
    res.forEach(l => map[l.role] = l)
    return successResultOf(map)
  })
}

async function upsert(
  role: UserRole,
  limits: Partial<Limits>,
): Promise<DBResult<LimitDoc>> {
  return runCatching("limits.dam.upsert", async () => {
    const res = await col.updateOne({ role }, { $set: limits }, { upsert: true })
    if (!res.acknowledged || res.matchedCount === 0
      || (res.upsertedCount === 0 && res.modifiedCount === 0))
      return InternalFailureResult
    return get(role)
  })
}

export default { init, get, getAll, upsert }
