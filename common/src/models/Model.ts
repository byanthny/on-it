import Joi from "joi"

export type ID = string

type Snowflake = {
  _id?: ID
  createdAt?: string | Date
  updateAt?: string | Date
}

export const idSchema = Joi.string().regex(/\d+/)

export default Snowflake
