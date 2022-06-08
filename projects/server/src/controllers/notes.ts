import { HandlerGroup } from "../types/express"
import db from "../db"
import { reduceDBResultStatus } from "./util"
import { ApiErrors } from "../ApiError"
import { Note, Schemae, validate } from "common"
import { DBResultStatus } from "../db/types"

const get: HandlerGroup = {
  async one({ params: { nid }, session }, res) {
    const { status, data } = await db.notes.get({ _id: nid, uid: session.uid })
    const err = reduceDBResultStatus(status)
    if (err) return res.error(err)
    res.pack(data)
  },
  async many(_, res) {
    res.error(ApiErrors.TODO())
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
  async one(_, res) {
    res.error(ApiErrors.TODO())
  },
}
const _delete: HandlerGroup = {
  async one({ params: { nid }, session }, res) {
    const { status, data } = await db.notes.deleteMany({ _id: nid, uid: session.uid })
    const dbErr = reduceDBResultStatus(status)
    if (dbErr) return res.error(dbErr)
    res.pack(data)
  },
}

export default { get, post, patch, delete: _delete }
