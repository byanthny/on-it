import { object, string } from "joi"
import { Request, Response } from "../../types/express"
import { DuplicateError, MalformedContentError } from "../../errors"
import dao from "../../dao"
import logger from "winston"
import { nameSchema } from "common"

export const register = async (req: Request, res: Response) => {
  logger.info("ROUTES: register")
  // validate incoming data
  const { value, error } = object({
    email: string().email().required(),
    password: string()
      .min(8)
      .max(32)
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
      .required(),
  }).validate(req.body, { stripUnknown: true })

  if (error) throw new MalformedContentError(error.message)

  // check for duplicates
  const { email } = value
  if (await dao.users.existsByEmail(email))
    throw new DuplicateError("email in use")

  // call registration functiona
  const result = await dao.users.register(email, value.password)

  // return created user and token
  res.status(201).pack(result)
}

export const login = async (req: Request, res: Response) => {
  // validate
  const { value, error } = object({
    email: string().email(),
    username: nameSchema,
    password: string().max(1024).required(),
  })
    .xor("email", "username")
    .validate(req.body, { stripUnknown: true })

  if (error) throw new MalformedContentError(error.message)

  const result = await (value.email
    ? dao.users.loginWithEmail(value)
    : dao.users.loginWithDisplayName(value))

  res.pack(result)
}
