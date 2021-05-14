import Joi from "joi"
import Snowflake, { ID, idSchema } from "./Model"
import Project, { projectSchema } from "./Project"

export const taskSchema = {
  parent: idSchema.optional(),
  title: Joi.string().min(1).max(255),
  state: Joi.string().valid("todo", "done", "cancelled").default("todo"),
  due: Joi.date().raw(),
  reminders: Joi.array().items(Joi.date().raw()),
  pinned: Joi.bool(),
  tags: Joi.array()
    .items(idSchema, Joi.object({ id: idSchema }).unknown(true))
    .custom((value) => {
      let out: string[] = []
      if (value.length > 0) {
        for (const v of value) {
          out.push(typeof v !== "string" ? v.id : v)
        }
        return out
      }
    })
    .optional(),
}

export type TaskState = "todo" | "done" | "cancelled"

type Task<Tag extends Project | string = Project> = Snowflake & {
  uid: ID
  parent?: ID
  title: string
  state: TaskState
  due?: string
  reminders?: string[]
  pinned?: boolean
  tags?: Tag[]
}

export default Task
