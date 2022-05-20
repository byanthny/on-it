import Joi from "joi"

export type ID = string

type Snowflake = { _id?: ID }

export const idSchema = Joi.string().regex(/\d+/)

export default Snowflake
