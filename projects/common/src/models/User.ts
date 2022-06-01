import Joi from "joi"
import { Snowflake } from "./Model"
import { nameSchema } from "./name"

export const userSchema = {
  email: Joi.string().email({ tlds: { allow: false } }),
  name: Joi.object({
    first: nameSchema.optional(),
    last: nameSchema.optional(),
    display: nameSchema.optional(),
  }).optional(),
  role: Joi.string().valid("GENERIC", "DEVELOPER", "ADMIN").optional(),
}

export enum UserRole {
  GENERIC = "GENERIC",
  DEVELOPER = "DEVELOPER",
  ADMIN = "ADMIN",
}

export type User = Snowflake & {
  email: string
  role: UserRole
  name?: {
    first?: string
    last?: string
    display?: string
  }
}

