import Joi from "joi"
import Snowflake, { ID, idSchema } from "./Model"
import Nestable, { NestableSearch } from "./Nestable"
import Project from "./Project"
import Taggable, { taggableSchema, TaggableSearch } from "./Taggable"

export const noteSchema = {
  ...taggableSchema,
  parent: idSchema,
  title: Joi.string().min(1).max(255).default("Untitled"),
  text: Joi.string().max(5120),
}

export type NoteSearch = NestableSearch & TaggableSearch & {
  title?: string
  text?: string
}

type Note<Tag extends Project | string = Project> = Snowflake &
  Nestable &
  Taggable<Tag> & {
    uid: ID
    parent: ID
    title: string
    text: string
  }

export default Note
