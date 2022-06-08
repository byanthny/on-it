import Joi from "joi"
import { Snowflake, nameSchema } from "./Model"

export const userSchema = {
  email: Joi.string().email({ tlds: { allow: false } }).max(1024),
  name: Joi.object({
    first: nameSchema.optional(),
    last: nameSchema.optional(),
    display: nameSchema.optional(),
  }).optional(),
  role: Joi.string().valid("GENERIC", "DEVELOPER", "ADMIN").optional(),
}

export const authSchema = {
  email: userSchema.email.required(),
  password: Joi
    .string()
    .min(8)
    .max(32)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
    .required(),
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

