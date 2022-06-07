import { HandlerGroup } from "../types/express"
import db from "../db"
import { ApiErrors } from "../ApiError"
import { Schemae, Tag, TagSearch, validate } from "common"
import { DBResultStatus } from "../db/types"

const get: HandlerGroup = {
  /**
   * GET /tags/:pid
   * SELF
   */
  one: async ({ session, params: { pid } }, res) => {
    const { status, data } = await db.tags.get({ _id: pid, uid: session.uid })
    switch (status) {
      case DBResultStatus.SUCCESS:
        res.pack(data)
        break
      case DBResultStatus.FAILURE_NO_MATCH:
        res.error(ApiErrors.NotFound())
        break
      case DBResultStatus.FAILURE_INTERNAL:
        res.error(ApiErrors.Internal())
    }
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
    switch (status) {
      case DBResultStatus.SUCCESS:
        res.pack(data)
        break
      case DBResultStatus.FAILURE_NO_MATCH:
        res.error(ApiErrors.NotFound())
        break
      case DBResultStatus.FAILURE_INTERNAL:
        res.error(ApiErrors.Internal())
        break
    }
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
    switch (status) {
      case DBResultStatus.SUCCESS:
        res.status(201).pack(data)
        break
      default:
        res.error(ApiErrors.Internal())
        break
    }
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
    switch (status) {
      case DBResultStatus.SUCCESS:
        res.pack(data)
        break
      case DBResultStatus.FAILURE_NO_MATCH:
        res.error(ApiErrors.NotFound())
        break
      case DBResultStatus.FAILURE_INTERNAL:
        res.error(ApiErrors.Internal())
        break
    }
  },
}

const _delete: HandlerGroup = {
  /**
   * DELETE /tags/:pid
   * SELF
   */
  one: async ({ session: { uid }, params: { pid } }, res) => {
    const { status, data: deleteCount } = await db.tags.deleteMany({ uid, _id: pid })
    switch (status) {
      case DBResultStatus.SUCCESS:
        res.pack(deleteCount)
        break
      case DBResultStatus.FAILURE_NO_MATCH:
        res.error(ApiErrors.NotFound())
        break
      case DBResultStatus.FAILURE_INTERNAL:
        res.error(ApiErrors.Internal())
        break
    }
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
