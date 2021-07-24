import { Handler } from "../../types/express"
import ApiError from "../../ApiError"
import dao from "../../dao"
import Joi from "joi"
import { limitsSchema } from "common"

export const one: Handler = async ({ body }, { pack }) => {
  // validate
  const { value, error } = Joi.object(limitsSchema).validate(body, {
    stripUnknown: true,
  })

  if (error) ApiError.MalformedContent(error.message)

  const limits = await dao.internal.limits.create(value)

  pack(limits)
}
