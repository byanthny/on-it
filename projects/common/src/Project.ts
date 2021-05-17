import Joi from "joi"
import Snowflake from "./Model"
import { nameSchema } from "./name"

export const projectSchema = {
  name: nameSchema,
  color: Joi.string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .optional(),
}

export type ProjectSearch = { name: string }

type Project = Snowflake & {
  uid: string
  name: string
  color?: string
}

export default Project
