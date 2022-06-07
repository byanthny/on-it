import client from "../client"
import { WithId } from "mongodb"
import { Limits, UserRole } from "common"
import names from "../names"
import { DBResult, DBResultStatus } from "../types"
import logger from "winston"

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
  try {
    const res = await col.findOne({ role })
    if (!res) return { status: DBResultStatus.FAILURE_NO_MATCH }
    return { status: DBResultStatus.SUCCESS, data: res }
  } catch (error) {
    logger.error("limits.dam.get", { error })
    return { status: DBResultStatus.FAILURE_INTERNAL }
  }
}

async function getAll(): Promise<DBResult<Record<UserRole, LimitDoc>>> {
  try {
    const res = await col.find().toArray()
    const map: Record<UserRole, LimitDoc> = {
      ADMIN: undefined, DEVELOPER: undefined, GENERIC: undefined,
    }
    res.forEach(l => map[l.role] = l)
    return { status: DBResultStatus.SUCCESS, data: map }
  } catch (error) {
    logger.error("limits.dam.getAll", { error })
    return { status: DBResultStatus.FAILURE_INTERNAL }
  }
}

async function upsert(
  role: UserRole,
  limits: Partial<Limits>,
): Promise<DBResult<LimitDoc>> {
  const res = await col.updateOne({ role }, { $set: limits }, { upsert: true })
  if (!res.acknowledged || res.matchedCount === 0
    || (res.upsertedCount === 0 && res.modifiedCount === 0))
    return { status: DBResultStatus.FAILURE_INTERNAL }
  return get(role)
}

export default { init, get, getAll, upsert }
