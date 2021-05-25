import Joi from "joi"
import Snowflake from "./Model"

export const projectSchema = {
  name: Joi.string().regex(/^[A-Za-z][A-Za-z0-9_\-\s]{0,13}$/),
  color: Joi.string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .optional(),
}

export type ProjectSearch = { name?: string }

type Project = Snowflake & {
  uid: string
  name: string
  color?: string
}

export default Project
