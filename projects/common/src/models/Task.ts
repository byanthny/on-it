import Joi from "joi"
import Snowflake, { ID, idSchema } from "./Model"
import Nestable from "./Nestable"
import Project from "./Project"
import Taggable, { taggableSchema } from "./Taggable"

export const taskSchema = {
  ...taggableSchema,
  parent: idSchema.optional(),
  title: Joi.string().min(1).max(255),
  state: Joi.string().valid("todo", "done", "cancelled").default("todo"),
  due: Joi.date().raw(),
  reminders: Joi.array().items(Joi.date().raw()),
  pinned: Joi.bool(),
}

export enum TaskState {
  TODO = "todo",
  DONE = "done",
  CANCELLED = "cancelled",
}

// TODO Task Date Range Search
export type TaskSearch = {
  parent?: ID
  state?: TaskState
  tags?: ID[]
}

type Task<Tag extends Project | string = Project> = Snowflake &
  Nestable &
  Taggable<Tag> & {
    uid: ID
    title: string
    state: TaskState
    due?: string
    reminders?: string[]
    pinned?: boolean
  }

export default Task
