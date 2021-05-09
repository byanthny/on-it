import Joi from "joi"
import { idSchema } from "./Model"

export const noteSchema = {
  uid: idSchema,
  parent: idSchema,
  title: Joi.string().min(1).max(255).default("Untitled"),
  text: Joi.string().max(5120),
  tags: Joi.array().items(Joi.string()),
}

type Note = {
  uid: string
  parent: string
  title: string
  text: string
  tags: string[]
}

export default Note
