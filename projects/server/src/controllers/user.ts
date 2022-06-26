import { HandlerGroup, Request, Response } from "../types/express"
import db from "../db"
import { ApiErrors } from "../ApiError"
import logger from "winston"
import bcrypt from "bcryptjs"
import { Schemae, User, validate } from "common"
import { DBResultStatus } from "../db/types"
import { reduceDBResultStatus } from "./util"

const get: HandlerGroup = {
  /**
   * GET /users/:uid
   * SELF
   */
  one: async ({ session, params: { uid } }, res) => {
    if (uid !== session.uid) return res.error(ApiErrors.Authorization())
    const { status, data } = await db.users.get({ _id: uid }, ["password"])
    const error = reduceDBResultStatus(status)
    if (error) return res.error(error)
    res.pack(data)
  },
  /**
   * GET /users?<UserSearch>
   */
  search: (_, { error }) => {
    error(ApiErrors.TODO())
  },
}

const post: HandlerGroup = {
  async register(req, res) {
    // reject logged in users
    if (req.session.uid) return res.error(ApiErrors.Authorization("user is logged in"))
    const { result, error } =
      validate<{ email: string, password: string }>(Schemae.auth, req.body)
    if (error) return res.error(ApiErrors.MalformedContent(error))
    // check duplicate emails
    if ((await db.users.count({ email: result.email })).data === 1)
      return res.error(ApiErrors.Duplicate("email already in use"))

    let passHash: string = await bcrypt.hash(result.password, 10)
    const { status, data } = await db.users.create(result.email, passHash, ["password"])
    if (status === DBResultStatus.FAILURE_INTERNAL) return res.error(ApiErrors.Internal())
    req.session.uid = data._id
    res.status(201).pack(data)
  },
  login: async ({ body, session }, res) => {
    if (!body.email) return res.error(ApiErrors.MalformedContent("missing email"))
    if (!body.password) return res.error(ApiErrors.MalformedContent("missing password"))

    // get user
    const { status, data: user } = await db.users.get({ email: body.email })
    switch (status) {
      case DBResultStatus.FAILURE_NO_MATCH:
        return res.error(ApiErrors.NotFound(`no user found with email ${ body.email }`))
      case DBResultStatus.FAILURE_INTERNAL:
        return res.error(ApiErrors.Internal())
    }

    // check password
    let valid = false
    try {
      valid = await bcrypt.compare(body.password, user.password)
    } catch (error) {
      logger.error("failed to compare passwords", { error })
      return res.error(ApiErrors.Internal())
    }
    if (!valid) return res.error(ApiErrors.Authentication("email and password do not match"))
    delete user.password
    session.uid = user._id
    res.pack(user)
  },
  logout: async (req, { pack }) => {
    delete req.session.uid
    delete req.session.user
    delete req.session.role
    pack("logged out")
  },
}

const patch: HandlerGroup = {
  async one({ params: { uid }, body, session }, res) {
    if (uid !== session.uid) return res.error(ApiErrors.Authorization())
    const { result, error } = validate<Partial<User>>(Schemae.user, body, true)
    if (error) return res.error(ApiErrors.MalformedContent(error))
    if (result.email && (await db.users.get({ email: result.email })).data)
      return res.error(ApiErrors.Duplicate("email already in use"))
    // TODO this wont allow anyone to change user roles
    const { status, data: user } = await db.users.update(
      uid, { ...result, role: session.role },
    )
    const dbError = reduceDBResultStatus(status)
    if (error) return res.error(dbError)
    delete user.password
    session.user = user
    session.role = user.role
    res.pack(user)
  },
}

const _delete: HandlerGroup = {
  async one({ params: { uid }, session }: Request, res: Response) {
    if (uid !== session.uid) return res.error(ApiErrors.Authorization())
    const { status: A, data: userDeleted } = await db.users.deleteMany(uid)
    const { status: B, data: tasksDeleted } = await db.tasks.deleteMany({ uid })
    const { status: C, data: tagsDeleted } = await db.tags.deleteMany({ uid })
    const { status: D, data: notesDeleted } = await db.notes.deleteMany({ uid })
    for (let status of [A, B, C, D]) {
      const error = reduceDBResultStatus(status)
      if (error) return res.error(error)
    }
    res.pack({ userDeleted: userDeleted === 1, tasksDeleted, notesDeleted, tagsDeleted })
  },
}

export default { get, post, patch, delete: _delete }
