import { HandlerGroup, Request, Response } from "../types/express"
import db from "../db"
import dao from "../db"
import { ApiErrors } from "../ApiError"
import { Schemae, Task, TaskSearch, validate } from "common"
import { DBResultStatus } from "../db/types"
import { reduceDBResultStatus } from "./util"
import Joi from "joi"

const get: HandlerGroup = {
  /**
   * GET /tasks/:tid
   */
  one: async ({ params: { tid }, session }, res) => {
    const { status, data } = await db.tasks.get({ _id: tid, uid: session.uid })
    const err = reduceDBResultStatus(status)
    if (err) return res.error(err)
    res.pack(data)
  },
  /**
   * GET /tasks?<TaskSearch>,SearchOptions
   */
  search: async ({ query, session: { uid } }: Request, res: Response) => {
    const { result, error } = validate<TaskSearch>(Schemae.search.task, query, true)
    if (error) return res.error(ApiErrors.MalformedContent(error))
    const { status, data } = await dao.tasks.search(
      { ...result, uid },
      { limit: result.limit, skip: result.skip },
    )
    const dbErr = reduceDBResultStatus(status)
    if (dbErr) return res.error(dbErr)
    res.pack(data)
  },
}

const post: HandlerGroup = {
  async one({ body, session }, res) {
    const { result, error } = validate<Task>(Schemae.task, body)
    if (error) return res.error(ApiErrors.MalformedContent(error))
    if (result.parent) {
      const { status } = await db.tasks.get({ _id: result.parent, uid: session.uid })
      switch (status) {
        case DBResultStatus.FAILURE_NO_MATCH:
          return res.error(ApiErrors.MalformedContent("parent does not exist"))
        case DBResultStatus.FAILURE_INTERNAL:
          return res.error(ApiErrors.Internal())
      }
    }
    const { status: lstatus, data: limits } = await db.limits.get(session.role)
    switch (lstatus) {
      case DBResultStatus.FAILURE_NO_MATCH:
        return res.error(ApiErrors.MalformedContent("parent does not exist"))
      case DBResultStatus.FAILURE_INTERNAL:
        return res.error(ApiErrors.Internal())
    }
    const { status: cstatus, data: count } = await db.tasks.count({ uid: session.uid })
    if (cstatus === DBResultStatus.FAILURE_INTERNAL) return res.error(ApiErrors.Internal())
    if ((count || 0) >= limits.tasks)
      return res.error(
        ApiErrors.MalformedContent(`maximum task count reached (${ count }`),
      )
    if (result.tags) {
      if (result.tags.length >= limits.tasks.maxTags)
        return res.error(ApiErrors.MalformedContent("task has too many tags"))
      const { status, data } = await db.tags.count({ _id: { $in: result.tags } })
      if (status === DBResultStatus.FAILURE_INTERNAL)
        return res.error(ApiErrors.Internal())
      if (data !== result.tags.length)
        return res.error(ApiErrors.MalformedContent("a tag does not exist"))
    }
    const { data, status } = await db.tasks.create({ ...result, uid: session.uid })
    if (status === DBResultStatus.SUCCESS) res.status(201).pack(data)
    else res.error(ApiErrors.Internal())
  },
}

const patch: HandlerGroup = {
  async one({ session, body, params: { tid } }, res) {
    const { result, error } = validate<Partial<Task>>(Schemae.task, body, true)
    if (error) return res.error(ApiErrors.MalformedContent(error))
    if (result.parent) {
      const { status } = await db.tasks.get({ uid: session.uid, _id: result.parent })
      switch (status) {
        case DBResultStatus.FAILURE_NO_MATCH:
          return res.error(ApiErrors.MalformedContent("parent does not exist"))
        case DBResultStatus.FAILURE_INTERNAL:
          return res.error(ApiErrors.Internal())
      }
    }
    const { status, data } = await dao.tasks.update(
      { _id: tid, uid: session.uid },
      { ...result, uid: session.uid },
    )
    const dbErr = reduceDBResultStatus(status)
    if (dbErr) return res.error(dbErr)
    res.pack(data)
  },
}

const _delete: HandlerGroup = {
  async one({ session, params: { tid } }, res) {
    const { status } = await db.tasks.delete({ uid: session.uid, _id: tid })
    const error = reduceDBResultStatus(status)
    if (error) return res.error(error)
    res.pack(true)
  },
  async many({ query, session: { uid } }, res) {
    const { result, error } =
      validate<{ ids: string[] }>({ ids: Joi.array().items(Schemae.id) }, query as any)
    if (error) return res.error(ApiErrors.MalformedContent(error))
    const { status, data } = await db.tasks.deleteManyByID(result.ids, uid)
    const dbErr = reduceDBResultStatus(status)
    if (dbErr) return res.error(dbErr)
    res.pack(data)
  },
}

export default { get, post, patch, delete: _delete }
