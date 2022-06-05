import { HandlerGroup, Request, Response } from "../types/express"
import db from "../db"
import dao from "../db"
import { ApiErrors } from "../ApiError"
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
  one: async ({ params: { tid }, session }, { error, pack }) => {
    const task = await db.tasks.get({ _id: tid })
    if (session.uid !== task.uid) return error(ApiErrors.Authorization())
    const populatedTask = await populateTags(task)
    pack(populatedTask)
  },
  /**
   * GET /tasks?<TaskSearch>,SearchOptions
   */
  search: async ({ query, session: { uid } }: Request, res: Response) => {
    const { result, error } = validate<TaskSearch>(Schemae.search.task, query)
    if (error) return res.error(ApiErrors.MalformedContent(error))
    const searchResult = await dao.tasks.search(
      { ...result, uid },
      { limit: result.limit, skip: result.skip },
    )
    const tasks: Task<Tag>[] = await Promise.all(searchResult.map(t => populateTags(t)))
    res.pack(tasks)
  },
}

const patch: HandlerGroup = {
  async one({ session, body, params: { tid } }, res) {
    const { result, error } = validate<Partial<Task>>(Schemae.task, body)
    if (error) return res.error(ApiErrors.MalformedContent(error))
    const old = await dao.tasks.get({ _id: tid })
    if (session.uid !== old.uid) return res.error(ApiErrors.Authorization())
    const updated = await dao.tasks.update(tid, result)
    if (updated) res.pack(updated, { old })
    else res.error(ApiErrors.Internal())
  },
}

export default { get, patch }
