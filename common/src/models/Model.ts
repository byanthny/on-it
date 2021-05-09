import Joi from "joi"

type Snowflake = {
  _id?: string
}

export const modelSchema = {
  _id: Joi.string().regex(/\d+/),
}

export default Snowflake
