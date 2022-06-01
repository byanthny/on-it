import Joi from "joi"
import { ID, idSchema, Snowflake } from "./Model"
import { Note } from "./Note"
import { nameSchema } from "./name"
import { Tag } from "./Tag"

export const taskSchema = {
  tags: Joi.array().items(nameSchema).optional(),
  parents: Joi.array().items(idSchema).optional(),
  title: Joi.string().min(1).max(255),
  state: Joi.string().valid("todo", "done", "cancelled").default("todo"),
  due: Joi.date().raw().optional(),
  reminders: Joi.array().items(Joi.date().raw()).optional(),
  pinned: Joi.bool().optional(),
}

export enum TaskState {
  TODO = "todo",
  DONE = "done",
  CANCELLED = "cancelled",
}

type TagType = ID | Tag

export type Task<TagType = ID> = Snowflake & {
  uid: ID
  title: string
  state: TaskState,
  parents?: string[]
  tags?: Tag[]
  notes?: Note[]
  due?: string
  reminders?: string[]
  pinned?: boolean
}


