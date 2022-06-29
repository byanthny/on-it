import Joi from "joi"
import { ID, idSchema, Snowflake } from "./Model"
import { SearchOptions, searchOptionSchema } from "../Net"
import { Tag } from "./Tag"

export const noteSchema = {
  parent: idSchema,
  title: Joi.string().min(1).max(255).default("Untitled"),
  text: Joi.string().max(5120),
  order: Joi.number().integer().min(0).optional(),
}

export type Note = Snowflake & {
  uid: ID
  parent: ID
  order?: number
  title: string
  text: string
  tags: Array<Tag>
  updated: Date | string
}

export type NoteSearch = SearchOptions & {
  uid?: ID
  parent?: ID
  text?: ID
}

export const noteSearchSchema = {
  ...searchOptionSchema,
  uid: idSchema.optional(),
  parent: idSchema.optional(),
  text: Joi.string().max(255).optional(),
}
