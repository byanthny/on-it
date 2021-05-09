import Joi from "joi"
import Snowflake, { modelSchema } from "./Model"
import { nameSchema } from "./name"

export const schema = {
  ...modelSchema,
  uid: Joi.string().regex(/\d+/),
  name: nameSchema,
  color: Joi.string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .optional(),
}

export type Project = Snowflake & {
  uid: string
  name: string
  color?: string
}
