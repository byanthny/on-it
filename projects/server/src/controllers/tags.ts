import { HandlerGroup } from "../types/express"
import db from "../db"
import { ApiErrors } from "../ApiError"
import { Schemae, Tag, TagSearch, validate } from "common"
import { DBResultStatus } from "../db/types"
import { reduceDBResultStatus } from "./util"

const get: HandlerGroup = {
  /**
   * GET /tags/:pid
   * SELF
   */
  one: async ({ session, params: { pid } }, res) => {
    const { status, data } = await db.tags.get({ _id: pid, uid: session.uid })
    const error = reduceDBResultStatus(status)
    if (error) return res.error(error)
    res.pack(data)
  },
  /**
   * GET /tags/?<TagSearch>
   * SELF
   */
  search: async ({ session: { uid }, query }, res) => {
    const { result, error } = validate<TagSearch>(Schemae.search.tag, query as any, true)
    if (error) return res.error(ApiErrors.MalformedContent(error))
    const { status, data } = await db.tags.search(
      { ...result, uid },
      { limit: result.limit, skip: result.skip },
    )
    const dbErr = reduceDBResultStatus(status)
    if (dbErr) return res.error(dbErr)
    res.pack(data)
  },
}

const post: HandlerGroup = {
  /**
   * POST /tags
   * SELF
   * BODY: TAG
   */
  one: async ({ body, session: { uid } }, res) => {
    const { result, error } = validate<Tag>(Schemae.tag, body)
    if (error) return res.error(ApiErrors.MalformedContent(error))
    if ((await db.tags.get({ uid, name: result.name })).status === DBResultStatus.SUCCESS)
      return res.error(ApiErrors.Duplicate("duplicate name"))
    const { status, data } = await db.tags.create(uid, result.name, result.color)
    if (status !== DBResultStatus.SUCCESS) res.error(ApiErrors.Internal())
    res.status(201).pack(data)
  },
}

const patch: HandlerGroup = {
  /**
   * PATCH /tags/:pid
   * SELF
   * BODY: Tag
   */
  one: async ({ session: { uid }, body, params: { pid } }, res) => {
    // validate
    const { result, error } = validate<Partial<Tag>>(Schemae.tag, body)
    if (error) return res.error(ApiErrors.MalformedContent(error))
    const { status, data } = await db.tags.update({ uid, _id: pid }, result)
    const dbErr = reduceDBResultStatus(status)
    if (db) return res.error(dbErr)
    res.pack(data)
  },
}

const _delete: HandlerGroup = {
  /**
   * DELETE /tags/:pid
   * SELF
   */
  one: async ({ session: { uid }, params: { pid } }, res) => {
    const { status, data: deleteCount } = await db.tags.deleteMany({ uid, _id: pid })
    const error = reduceDBResultStatus(status)
    if (error) return res.error(error)
    res.pack(deleteCount)
  },
  /**
   * DELETE /tags?<TagSearch>,ids=,,,
   * SELF
   */
  many: async (__, res) => {
    return res.error(ApiErrors.TODO())
  },
}

export default { get, post, patch, delete: _delete }
