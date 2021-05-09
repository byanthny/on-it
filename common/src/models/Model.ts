import Joi from "joi"

type Snowflake = {
  _id?: string
  createdAt?: string | Date
  updateAt?: string | Date
}

export const idSchema = Joi.string().regex(/\d+/)

export default Snowflake
