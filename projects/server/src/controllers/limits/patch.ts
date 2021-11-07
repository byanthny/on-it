import Joi from "joi"
import logger from "winston"
import { Handler } from "../../types/express"
import ApiError from "../../ApiError"
import dao from "../../dao"
import { Limits, limitsSchema, UserRole } from "common"

export const one: Handler = async ({ body, params: { role } }, { pack }) => {
  logger.info("ROUTES: limits patch one")

  // get limit
  const limit = await dao.limits.get(role.toUpperCase() as UserRole)

  // validate incoming
  const { value, error } = Joi.object(limitsSchema).validate(
    { ...body, role: limit.role },
    { stripUnknown: true },
  )

  if (error) ApiError.MalformedContent(error.message)

  // cast and remove incoming role
  const { role: _, ...preLimit } = value as Limits

  // update limit
  const newLimit = await dao.limits.update(role.toUpperCase() as UserRole, {
    ...limit,
    ...preLimit,
  })

  pack(newLimit)
}
