import { HandlerGroup, Request, Response } from "../types/express"
import db from "../db"
import dao from "../db"
import ApiError from "../ApiError"
import { ID, idSchema, Tag, Task } from "common"
import Joi from "joi"

async function populateTags(task: Task.type<ID>): Promise<Task.type<Tag.type>> {
  if (!task.tags) return task
  const tags = await Promise.all(task.tags?.map(pid => db.tags.get({ _id: pid })))
  return { ...task, tags }
}

const get: HandlerGroup = {
  /**
   * GET /tasks/:tid
   */
  one: async ({ params: { tid }, session }, { pack }) => {
    const task = await db.tasks.get({ _id: tid })
    if (session.uid !== task.uid) ApiError.Authorization()
    const populatedTask = await populateTags(task)
    pack(populatedTask)
  },
  /**
   * GET /tasks?<TaskSearch>,SearchOptions
   */
  search: async ({ query, user }: Request, { pack }: Response) => {
    const { value, error } = Joi.object({
      parent: idSchema.optional(),
      state: Joi.string()
        .valid(Task.State.TODO, Task.State.CANCELLED, Task.State.DONE)
        .optional(),
      tags: Joi.string()
        .trim()
        .regex(/^\d+(,\d+)*$/)
        .custom((value: string) => value.split(",").filter((s) => s.length > 0))
        .optional(),
    }).validate(query, { stripUnknown: true })

    if (error) ApiError.MalformedContent(error.message)

    const searchResult = await dao.tasks.search(user.id!, value)

    const tasks: Task.type<Tag.type>[] =
      await Promise.all(searchResult.map(t => populateTags(t)))

    pack(tasks)
  },
}

export default { get }