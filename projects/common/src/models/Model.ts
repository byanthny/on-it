import Joi from "joi"

export type ID = string
export type Snowflake = { _id?: ID }
export const idSchema = Joi.string().regex(/\d+/)
