import Joi from "joi"
import Snowflake, { idSchema } from "./Model"
import { nameSchema } from "./name"

export const projectSchema = {
  uid: idSchema,
  name: nameSchema,
  color: Joi.string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .optional(),
}

type Project = Snowflake & {
  uid: string
  name: string
  color?: string
}

export default Project
