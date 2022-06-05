import { HandlerGroup, Request, Response } from "../types/express"
import db from "../db"
import { ApiErrors } from "../ApiError"
import joi from "Joi"
import logger from "winston"
import bcrypt from "bcryptjs"
  import { Schemae, User, validate } from "common"
import { DBResultStatus } from "../db/types"

const get: HandlerGroup = {
  /**
   * GET /users/:uid
   * SELF
   */
  one: async ({ session, params: { uid } }, res) => {
    if (uid !== session.uid) return res.error(ApiErrors.Authorization())

    const { status, data } = await db.users.get({ _id: uid }, ["password"])
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
    const { result, error } = validate<{ email: string, password: string }>(
      {
        email: joi.string().email().max(1024).required(),
        password: joi.string().required(),
      },
      req.body,
    )

    if (error) return res.error(ApiErrors.MalformedContent(error))

    // validate password
    const { error: passwordError } = joi
      .string()
      .min(8)
      .max(32)
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
      .validate(result.password)

    if (passwordError) return res.error(
      ApiErrors.MalformedContent(
        "Password must be 8-32 char and match /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]+$/",
      ),
    )

    // check duplicate emails
    if ((await db.users.get({ email: result.email })).status === DBResultStatus.SUCCESS)
      return res.error(ApiErrors.Duplicate("email already in use"))

    let passHash: string = await bcrypt.hash(result.password, 10)
    const { status, data: user } = await db.users.create(result.email, passHash)
    switch (status) {
      case DBResultStatus.SUCCESS:
        delete user.password
        req.session.uid = user._id
        res.status(201).pack(user)
        break
      case DBResultStatus.FAILURE_INTERNAL:
        res.error(ApiErrors.Internal())
    }
  },
  login: async ({ body, session }, res) => {
    if (!body.email) return res.error(ApiErrors.MalformedContent("missing email"))
    else if (!body.password) return res.error(ApiErrors.MalformedContent("missing password"))

    // get user
    const { status, data: user } = await db.users.get({ email: body.email })
    switch (status) {
      case DBResultStatus.FAILURE_NO_MATCH:
        return res.error(ApiErrors.NotFound("user does not exist"))
      case DBResultStatus.FAILURE_INTERNAL:
        return res.error(ApiErrors.Internal())
    }

    // check password
    let valid = false
    try {
      valid = await bcrypt.compare(body.password, user.password)
    } catch (error) {
      logger.error("failed to compare passwords", { error })
      return error(ApiErrors.Internal())
    }
    if (!valid) return res.error(ApiErrors.Authentication("incorrect password"))
    delete user.password
    session.uid = user._id
    res.pack(user)
  },
  logout: async (req, { pack }) => {
    delete req.session.uid
    pack("logged out")
  },
}

const patch: HandlerGroup = {
  async one({ params: { uid }, body, session }, res) {
    if (uid !== session.uid) return res.error(ApiErrors.Authorization())
    const { result, error } = validate<Partial<User>>(Schemae.user, body)
    if (error) return res.error(ApiErrors.MalformedContent(error))
    if (result.email && (await db.users.get({ email: result.email })).data)
      return res.error(ApiErrors.Duplicate("email already in use"))
    // TODO this wont allow anyone to change user roles
    const { status, data: user } = await db.users.update(
      uid, { ...result, role: session.role },
    )
    switch (status) {
      case DBResultStatus.SUCCESS:
        delete user.password
        res.pack(user)
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
  async one({ params: { uid }, session }: Request, res: Response) {
    if (uid !== session.uid) return res.error(ApiErrors.Authorization())
    const { status, data: userDeleted } = await db.users.delete(uid)
    switch (status) {
      case DBResultStatus.FAILURE_NO_MATCH:
        return res.error(ApiErrors.NotFound())
      case DBResultStatus.FAILURE_INTERNAL:
        return res.error(ApiErrors.Internal())
    }
    const tasksDeleted = await db.tasks.delete({ uid })
    const tagsDeleted = await db.tags.delete({ uid })
    const notesDeleted = await db.notes.delete({ uid })
    res.pack({ userDeleted, tasksDeleted, notesDeleted, tagsDeleted })
  },
}

export default { get, post, patch, delete: _delete }
