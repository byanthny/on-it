import Joi from "joi"

export type ID = string
export type Snowflake = { _id?: ID }
export const idSchema = Joi.string().regex(/\d+/)
export const nameSchema = Joi.string()
  .min(1)
  .max(14)
  .regex(/^[A-Za-z][A-Za-z0-9_\-]{0,13}$/)
