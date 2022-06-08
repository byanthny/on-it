import { HandlerGroup } from "../types/express"
import db from "../db"
import { Limits, Schemae, UserRole, validate } from "common"
import { ApiErrors } from "../ApiError"
import { reduceDBResultStatus } from "./util"

const get: HandlerGroup = {
  async one({ params: { role } }, res) {
    const { status, data } = await db.limits.get(role.toUpperCase() as UserRole)
    const err = reduceDBResultStatus(status)
    if (err) return res.error(err)
    res.pack(data)
  },
  async all(_, res) {
    const { status, data } = await db.limits.getAll()
    const err = reduceDBResultStatus(status)
    if (err) return res.error(err)
    res.pack(data)
  },
}

const patch: HandlerGroup = {
  /** PATCH /limits/:role */
  one: async ({ body, params: { role } }, res) => {
    // get limit
    const { status, data: limit } = await db.limits.get(role.toUpperCase() as UserRole)
    const dbErr = reduceDBResultStatus(status)
    if (dbErr) return res.error(dbErr)

    // validate incoming
    const { result, error } = validate<Partial<Limits>>(
      Schemae.admin.limit,
      { ...body, role: limit.role },
      true,
    )
    if (error) return res.error(ApiErrors.MalformedContent(error))
    // update limit
    const {
      status: B,
      data,
    } = await db.limits.upsert(role.toUpperCase() as UserRole, result)
    const dbErr2 = reduceDBResultStatus(B)
    if (dbErr2) return res.error(dbErr2)
    res.pack(data)
  },
}

const post: HandlerGroup = {
  one: async ({ body }, res) => {
    const { result, error } = validate<Limits>(Schemae.admin.limit, body)
    if (error) return res.error(ApiErrors.MalformedContent(error))
    const { status, data } = await db.limits.upsert(result.role, result)
    const dbErr = reduceDBResultStatus(status)
    if (dbErr) return res.error(dbErr)
    res.status(201).pack(data)
  },
}

export default { get, patch, post }
