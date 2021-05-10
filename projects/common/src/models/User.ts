import Joi from "joi"
import Snowflake from "./Model"
import { nameSchema } from "./name"

export const userSchema = {
  email: Joi.string().email(),
  name: Joi.object({
    first: nameSchema.optional(),
    last: nameSchema.optional(),
    display: nameSchema.optional(),
  }).optional(),
}

type User = Snowflake & {
  email: string
  name?: {
    first?: string
    last?: string
    display?: string
  }
}

export default User
