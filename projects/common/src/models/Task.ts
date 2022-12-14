import Joi from "joi"
import { ID, idSchema, Snowflake } from "./Model"
import { Note } from "./Note"
import { Tag } from "./Tag"
import { SearchOptions, searchOptionSchema } from "../Net"

export const taskSchema = {
  tags: Joi.array().items(idSchema).optional(),
  parents: Joi.array().items(idSchema).optional(),
  title: Joi.string().min(1).max(255),
  description: Joi.string().max(255).optional(),
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
  description?: string
  parent?: string
  tags?: Tag[]
  due?: Date | number
  reminders?: Date[] | string[]
  pinned?: boolean
}

export type TaskWithNotes = Task<Tag> & { notes?: Note[] }

export type TaskSearch = SearchOptions & {
  uid?: string
  parent?: string
  tags?: string[]
  state?: TaskState[] | TaskState
  text?: string
  due?: {
    before?: string
    after?: string
  }
}

export const taskSearchSchema = {
  ...searchOptionSchema,
  uid: idSchema.optional(),
  parent: idSchema.optional(),
  tags: Joi.array().items(idSchema).optional(),
  state: Joi.allow(taskSchema.state, Joi.array().items(taskSchema.state)).optional(),
  text: Joi.string().max(255).optional(),
  due: Joi.object({
    before: Joi.string().isoDate().optional(),
    after: Joi.string().isoDate().optional(),
  }),
}
