import { HandlerGroup, Request, Response } from "../types/express"
import db from "../db"
import ApiError from "../ApiError"
import joi from "joi"
import logger from "winston"
import bcrypt from "bcryptjs"
import { User, validate } from "common"

const get: HandlerGroup = {
  /**
   * GET /users/:uid
   * SELF
   */
  one: async ({ session, params: { uid } }, { pack }) => {
    if (uid !== session.uid) ApiError.Authorization()
    const userData = await db.users.get({ _id: uid })
    if (!userData) ApiError.NotFound()
    pack(userData)
  },
  /**
   * GET /users?<UserSearch>
   */
  search: (_, __) => {
    ApiError.TODO()
  },
}

const post: HandlerGroup = {
  register: async (req, res) => {
    // reject logged in users
    if (req.session.uid) ApiError.Authorization("user is logged in")

    const valResult = await validate<{ email: string, password: string }>(
      {
        email: joi.string().email().max(1024).required(),
        password: joi.string().required(),
      },
      req.body,
    )

    if (typeof valResult === "string") return ApiError.MalformedContent(valResult)

    // validate password
    const { error: passwordError } = joi
      .string()
      .min(8)
      .max(32)
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
      .validate(valResult.password)

    if (passwordError) ApiError.MalformedContent(
      "Password must be 8-32 char and match /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]+$/",
    )

    // check duplicate emails
    if ((await db.users.count({ email: valResult.email })) > 0)
      ApiError.Duplicate("email already in use")

    let passHash: string = await bcrypt.hash(valResult.password, 10)
    const user = await db.users.create(valResult.email, passHash)
    delete user.password

    req.session.uid = user._id
    res.status(201).pack(user)
  },
  login: async ({ body, session }, { pack }) => {
    if (!body.email) ApiError.MalformedContent("missing email")
    if (!body.password) ApiError.MalformedContent("missing password")

    // get user
    const user = await db.users.get({ email: body.email })
    if (!user) ApiError.NotFound("user does not exist")

    // check password
    let valid = false
    try {
      valid = await bcrypt.compare(body.email, user.password)
    } catch (error) {
      logger.error("failed to compare passwords", { error })
      ApiError.Internal()
    }
    if (!valid) ApiError.Authentication("incorrect password")
    delete user.password
    session.uid = user._id
    pack(user)
  },
  logout: async (req, { pack }) => {
    delete req.session
    pack("logged out")
  },
}

const patch: HandlerGroup = {
  one: async ({ params: { uid }, body, session }, { pack }) => {
    if (uid !== session.uid) ApiError.Authorization()
    const valResult = await validate<Partial<User.type>>(User.schema, body)
    if (typeof valResult === "string") ApiError.MalformedContent(valResult)
    else if (valResult.email && (await db.users.count({ email: valResult.email })) > 0) {
      ApiError.Duplicate("email already in use")
    } else pack(await db.users.update(uid, valResult))
  },
}

const _delete: HandlerGroup = {
  one: async (
    { params: { uid }, session }: Request,
    { pack }: Response,
  ) => {
    if (uid !== session.uid) ApiError.Authorization()
    const userDeleted = await db.users.delete({ _id: uid })
    if (userDeleted === 0) ApiError.Internal("failed to delete user")
    const tasksDeleted = await db.tasks.delete({ uid })
    pack({ userDeleted, tasksDeleted })
  },
}

export default { get, post, patch, delete: _delete }