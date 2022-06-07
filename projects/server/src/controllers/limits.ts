import { HandlerGroup, Request, Response } from "../types/express"
import db from "../db"
import { Limits, Schemae, UserRole, validate } from "common"
import { ApiErrors } from "../ApiError"
import { DBResultStatus } from "../db/types"

const get: HandlerGroup = {
  one: async ({ params: { role } }: Request, { pack }: Response) => {
    const limits = await db.limits.get(role.toUpperCase() as UserRole)
    pack(limits)
  },
  all: async (_: Request, { pack }: Response) => {
    const limits = await db.limits.getAll()
    pack(limits)
  },
}

const patch: HandlerGroup = {
  /** PATCH /limits/:role */
  one: async ({ body, params: { role } }, res) => {
    // get limit
    const { status, data: limit } = await db.limits.get(role.toUpperCase() as UserRole)

    switch (status) {
      case DBResultStatus.FAILURE_NO_MATCH:
        return res.error(ApiErrors.NotFound())
      case DBResultStatus.FAILURE_INTERNAL:
        return res.error(ApiErrors.Internal())
    }

    // validate incoming
    const { result, error } = validate<Partial<Limits>>(
      Schemae.admin.limit,
      { ...body, role: limit.role },
      true,
    )
    if (error) return res.error(ApiErrors.MalformedContent(error))
    // update limit
    const newLimit = await db.limits.upsert(role.toUpperCase() as UserRole, result)
    res.pack(newLimit)
  },
}

const post: HandlerGroup = {
  one: async ({ body }, res) => {
    const { result, error } = validate<Limits>(Schemae.admin.limit, body)
    if (error) return res.error(ApiErrors.MalformedContent(error))
    const limits = await db.limits.upsert(result.role, result)
    res.status(201).pack(limits)
  },
}

export default { get, patch, post }
