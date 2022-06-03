import { HandlerGroup } from "../types/express"
import db from "../db"
import ApiError from "../ApiError"
import { Schemae, SearchQuery, Tag, validate } from "common"
import joi from "Joi"

const get: HandlerGroup = {
  /**
   * GET /tags/:pid
   * SELF
   */
  one: async ({ session, params: { pid } }, { pack }) => {
    const tag = await db.tags.get({ _id: pid, uid: session.uid })
    if (!tag) ApiError.NotFound()
    pack(tag)
  },
  /**
   * GET /tags/?<TagSearch>
   * SELF
   */
  search: async ({ session: { uid }, query }, { pack }) => {
    const valRes = await validate<SearchQuery<Partial<Tag>>>({
      ...Schemae.tag,
      ...Schemae.search.options,
    }, query as any, true)
    if (typeof valRes === "string") return ApiError.MalformedContent(valRes)
    const tags = await db.tags.search({ ...valRes.search, uid }, valRes.options)
    pack(tags)
  },
}

const post: HandlerGroup = {
  /**
   * POST /tags
   * SELF
   * BODY: TAG
   *
   * TODO should duplicate names be allowed? prob not
   */
  one: async ({ body, session: { uid } }, { status }) => {
    const valRes = validate<Tag>(Schemae.tag, body)
    if (typeof valRes === "string") ApiError.MalformedContent(valRes)
    else {
      const tag = await db.tags.create(uid, valRes.name, valRes.color)
      if (!tag) ApiError.Internal("failed to create new tag")
      status(201).pack(tag)
    }
  },
}

const patch: HandlerGroup = {
  /**
   * PATCH /tags/:pid
   * SELF
   * BODY: Tag
   */
  one: async ({ session: { uid }, body, params: { pid } }, { pack }) => {
    // validate
    const { value, error }: { value: Partial<Tag>, error: any } =
      joi.object(Schemae.tag).validate(body, { stripUnknown: true })
    if (error) ApiError.MalformedContent(error.message)

    const updated = await db.tags.update({ uid, _id: pid }, value)
    if (!updated) ApiError.NotFound()
    pack(updated)
  },
}

const _delete: HandlerGroup = {
  /**
   * DELETE /tags/:pid
   * SELF
   */
  one: async ({ session: { uid }, params: { pid } }, { pack }) => {
    const deleteCount = await db.tags.delete({ uid, _id: pid })
    if (deleteCount === 0) ApiError.NotFound()
    pack(deleteCount)
  },
  /**
   * DELETE /tags?<TagSearch>,ids=,,,
   * SELF
   */
  many: async ({ session: { uid }, query }, { pack }) => {
    ApiError.TODO()
    const { name, ids } = (query as Tag & { ids: string })
    const filter: Record<any, any> = {}
    if (name) filter.name = name
    if (ids) filter._id = ids.split(",").filter(s => s.length > 0)
    const deleteCount = await db.tags.delete({ uid, name, _id: ids })
    pack(deleteCount)
  },
}

export default { get, post, patch, delete: _delete }
