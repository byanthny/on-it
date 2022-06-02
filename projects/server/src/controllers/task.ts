import { HandlerGroup, Request, Response } from "../types/express"
import db from "../db"
import dao from "../db"
import ApiError from "../ApiError"
import { Schemae, Tag, Task, TaskSearch, validate } from "common"

async function populateTags(task: Task): Promise<Task<Tag>> {
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
  search: async ({ query, session: { uid } }: Request, { pack }: Response) => {
    const valRes = await validate<TaskSearch>(Schemae.search.task, query)
    if (typeof valRes === "string") return ApiError.MalformedContent(valRes)

    const searchResult = await dao.tasks.search(
      { ...valRes, uid },
      { limit: valRes.limit, skip: valRes.skip },
    )

    const tasks: Task<Tag>[] =
      await Promise.all(searchResult.map(t => populateTags(t)))

    pack(tasks)
  },
}

export default { get }
