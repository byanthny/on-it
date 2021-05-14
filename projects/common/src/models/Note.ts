import Joi from "joi"
import { ID, idSchema } from "./Model"

export const noteSchema = {
  parent: idSchema,
  title: Joi.string().min(1).max(255).default("Untitled"),
  text: Joi.string().max(5120),
  tags: Joi.array().items(Joi.string()),
}

type Note = {
  uid: ID
  parent: ID
  title: string
  text: string
  tags: ID[]
}

export default Note
