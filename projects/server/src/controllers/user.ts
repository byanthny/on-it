import { HandlerGroup, Request, Response } from "../types/express"
import db from "../db"
import { ApiErrors } from "../ApiError"
import joi from "Joi"
import logger from "winston"
import bcrypt from "bcryptjs"
import { Schemae, User, UserRole, validate } from "common"

const get: HandlerGroup = {
  /**
   * GET /users/:uid
   * SELF
   */
  one: async ({ session, params: { uid } }, { pack, error }) => {
    if (uid !== session.uid) return error(ApiErrors.Authorization())

    const userData = await db.users.get({ _id: uid }, ["password"])
    if (userData) pack(userData)
    else error(ApiErrors.NotFound())

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
    if (await db.users.get({ email: result.email }))
      return res.error(ApiErrors.Duplicate("email already in use"))

    let passHash: string = await bcrypt.hash(result.password, 10)
    const user = await db.users.create(result.email, passHash)
    delete user.password
    req.session.uid = user._id
    res.status(201).pack(user)
  },
  login: async ({ body, session }, { pack, error }) => {
    if (!body.email) return error(ApiErrors.MalformedContent("missing email"))
    else if (!body.password) return error(ApiErrors.MalformedContent("missing password"))

    // get user
    const user = await db.users.get({ email: body.email })
    if (!user) return error(ApiErrors.NotFound("user does not exist"))

    // check password
    let valid = false
    try {
      valid = await bcrypt.compare(body.password, user.password)
    } catch (error) {
      logger.error("failed to compare passwords", { error })
      return error(ApiErrors.Internal())
    }
    if (!valid) return error(ApiErrors.Authentication("incorrect password"))
    delete user.password
    session.uid = user._id
    pack(user)
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
    if (result.email && (await db.users.get({ email: result.email })))
      return res.error(ApiErrors.Duplicate("email already in use"))
    // TODO
    result.role = UserRole.ADMIN
    const user = await db.users.update(uid, result)
    delete user.password
    res.pack(user)
  },
}

const _delete: HandlerGroup = {
  async one({ params: { uid }, session }: Request, res: Response) {
    if (uid !== session.uid) return res.error(ApiErrors.Authorization())
    const userDeleted = await db.users.delete(uid)
    if (userDeleted === 0) return res.error(ApiErrors.Internal("failed to delete users"))
    const tasksDeleted = await db.tasks.delete({ uid })
    const tagsDeleted = await db.tags.delete({ uid })
    const notesDeleted = await db.notes.delete({ uid })
    res.pack({ userDeleted, tasksDeleted, notesDeleted, tagsDeleted })
  },
}

export default { get, post, patch, delete: _delete }
