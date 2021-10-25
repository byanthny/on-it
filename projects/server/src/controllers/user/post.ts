import joi from "joi"
import { Request, Response } from "../../types/express"
import ApiError from "../../ApiError"
import dao from "../../dao"

export const register = async (req: Request, res: Response) => {
  // validate incoming data
  const { value, error } = joi.object({
    email: joi.string().email().required(),
    password: joi.string()
      .min(8)
      .max(32)
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
      .required(),
  }).validate(req.body, { stripUnknown: true })

  if (error) ApiError.MalformedContent(error.message)

  // check for duplicates
  const { email } = value
  if (await dao.users.existsByEmail(email)) ApiError.Duplicate("email in use")

  // call registration functiona
  const result = await dao.users.register(email, value.password)

  // return created user and token
  res.status(201).pack(result)
}

export const login = async (req: Request, res: Response) => {
  // validate
  const { value, error } = joi.object({
    identity: joi.string().max(1024).required(),
    password: joi.string().max(1024).required(),
  }).validate(req.body, { stripUnknown: true })

  if (error) ApiError.MalformedContent(error.message)

  // User exists
  const exists = await dao.users.existsByNameOrEmail(value.identity)

  if (!exists) ApiError.NotFound("User not found")

  const result = await dao.users.login(value.identity, value.password)
  res.pack(result)
}
