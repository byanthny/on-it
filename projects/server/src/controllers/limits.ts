import { HandlerGroup, Request, Response } from "../types/express"
import db from "../db"
import { Limits, Schemae, UserRole } from "common"
import Joi from "joi"
import ApiError from "../ApiError"

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
  one: async ({ body, params: { role } }, { pack }) => {
    // get limit
    const limit = await db.limits.get(role.toUpperCase() as UserRole)

    // validate incoming
    const { value, error } = Joi.object(Schemae.admin.limit).validate(
      { ...body, role: limit.role },
      { stripUnknown: true },
    )

    if (error) ApiError.MalformedContent(error.message)

    // cast and remove incoming role
    const { role: _, ...preLimit } = value as Limits

    // update limit
    const newLimit = await db.limits.upsert(
      role.toUpperCase() as UserRole,
      { ...limit, ...preLimit },
    )

    pack(newLimit)
  },
}

const post: HandlerGroup = {
  one: async ({ body }, { pack }) => {
    // validate
    const { value, error } = Joi.object(Schemae.admin.limit)
      .validate(body, { stripUnknown: true })

    if (error) ApiError.MalformedContent(error.message)

    const limits = await db.limits.upsert(value.role, value)

    pack(limits)
  },

}

export default { get, patch, post }
