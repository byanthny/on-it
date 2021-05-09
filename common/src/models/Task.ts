import Joi from "joi"
import Snowflake, { idSchema } from "./Model"

export const taskSchema = {
  uid: idSchema,
  parent: idSchema.optional(),
  title: Joi.string().min(1).max(255),
  state: Joi.string().valid(["todo", "done", "cancelled"]),
  due: Joi.date(),
  reminders: Joi.array().items(Joi.date()),
  pinned: Joi.bool(),
  tags: Joi.array().items(Joi.string()),
}

export type TaskState = "todo" | "done" | "cancelled"

type Task = Snowflake & {
  uid: string
  parent?: string
  title: string
  state: TaskState
  due?: string
  reminders?: string[]
  pinned?: boolean
  tags: string[]
}

export default Task
