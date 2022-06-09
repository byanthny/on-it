import { HandlerGroup } from "../types/express"
import db from "../db"
import { reduceDBResultStatus } from "./util"
import { ApiErrors } from "../ApiError"
import { Note, NoteSearch, Schemae, validate } from "common"
import { DBResultStatus } from "../db/types"
import Joi from "joi"

const get: HandlerGroup = {
  async one({ params: { nid }, session }, res) {
    const { status, data } = await db.notes.get({ _id: nid, uid: session.uid })
    const err = reduceDBResultStatus(status)
    if (err) return res.error(err)
    res.pack(data)
  },
  async many({ query, session: { uid } }, res) {
    const { result, error } = validate<NoteSearch>(Schemae.search.note, query, true)
    if (error) return res.error(ApiErrors.MalformedContent(error))
    const { status, data } = await db.notes.search(
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
    const { result, error: valErr } = validate<Note>(Schemae.note, body)
    if (valErr) return res.error(ApiErrors.MalformedContent(valErr))
    // validate parent
    const { status: A } = await db.tasks.get({ uid: session.uid, _id: result.parent })
    switch (A) {
      case DBResultStatus.FAILURE_NO_MATCH:
        return res.error(ApiErrors.MalformedContent("parent does not exist"))
      case DBResultStatus.FAILURE_INTERNAL:
        return res.error(ApiErrors.Internal())
    }
    const { status, data } = await db.notes.create({ ...result, uid: session.uid })
    const dbErr = reduceDBResultStatus(status)
    if (dbErr) return res.error(dbErr)
    res.status(201).pack(data)
  },
}

const patch: HandlerGroup = {
  async one({ session, body, params: { nid } }, res) {
    const { result, error: valErr } = validate<Partial<Note>>(Schemae.note, body, true)
    if (valErr) return res.error(ApiErrors.MalformedContent(valErr))
    if (result.parent) {
      const { status: A } = await db.tasks.get({ uid: session.uid, _id: result.parent })
      switch (A) {
        case DBResultStatus.FAILURE_NO_MATCH:
          return res.error(ApiErrors.MalformedContent("parent does not exist"))
        case DBResultStatus.FAILURE_INTERNAL:
          return res.error(ApiErrors.Internal())
      }
    }
    const { status, data } = await db.notes.update(
      { _id: nid, uid: session.uid },
      { ...result, uid: session.uid },
    )
    const dbErr = reduceDBResultStatus(status)
    if (dbErr) return res.error(dbErr)
    res.pack(data)
  },
}

const _delete: HandlerGroup = {
  async one({ params: { nid }, session }, res) {
    const { status, data } = await db.notes.deleteMany({ _id: nid, uid: session.uid })
    const dbErr = reduceDBResultStatus(status)
    if (dbErr) return res.error(dbErr)
    res.pack(data)
  },
  async many({ query, session: { uid } }, res) {
    const { result, error } =
      validate<{ ids: string[] }>({ ids: Joi.array().items(Schemae.id) }, query as any)
    if (error) return res.error(ApiErrors.MalformedContent(error))
    const { status, data } = await db.notes.deleteManyByID(result.ids, uid)
    const dbErr = reduceDBResultStatus(status)
    if (dbErr) return res.error(dbErr)
    res.pack(data)
  },
}

export default { get, post, patch, delete: _delete }
