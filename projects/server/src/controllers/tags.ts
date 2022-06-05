import { HandlerGroup } from "../types/express"
import db from "../db"
import { ApiErrors } from "../ApiError"
import { Schemae, Tag, TagSearch, validate } from "common"

const get: HandlerGroup = {
  /**
   * GET /tags/:pid
   * SELF
   */
  one: async ({ session, params: { pid } }, res) => {
    const tag = await db.tags.get({ _id: pid, uid: session.uid })
    if (tag) res.pack(tag)
    else res.error(ApiErrors.NotFound())
  },
  /**
   * GET /tags/?<TagSearch>
   * SELF
   */
  search: async ({ session: { uid }, query }, res) => {
    const { result, error } = validate<TagSearch>(Schemae.search.tag, query as any, true)
    if (error) return res.error(ApiErrors.MalformedContent(error))
    const tags = await db.tags.search(
      { ...result, uid },
      { limit: result.limit, skip: result.skip },
    )
    res.pack(tags)
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
    if ((await db.tags.get({ uid, name: result.name })) !== null)
      return res.error(ApiErrors.Duplicate("duplicate name"))
    const tag = await db.tags.create(uid, result.name, result.color)
    if (tag) res.status(201).pack(tag)
    else res.error(ApiErrors.Internal("failed to create new tag"))
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
    const updated = await db.tags.update({ uid, _id: pid }, result)
    if (updated) res.pack(updated)
    else res.error(ApiErrors.NotFound())
  },
}

const _delete: HandlerGroup = {
  /**
   * DELETE /tags/:pid
   * SELF
   */
  one: async ({ session: { uid }, params: { pid } }, res) => {
    const deleteCount = await db.tags.delete({ uid, _id: pid })
    if (deleteCount === 1) res.pack(deleteCount)
    else res.error(ApiErrors.NotFound())
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
