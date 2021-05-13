import { Request, Response } from "../../types/express"
import dao from "../../dao"
import logger from "winston"
import { User, userSchema } from "common"
import Joi from "joi"
import ApiError from "../../errors"

export const one = async (req: Request, res: Response) => {
  logger.info("ROUTES: user patch one")
  const { uid } = req.params

  if (uid !== req.user!._id!) ApiError.Authorization()

  const { value, error } = Joi.object(userSchema).validate(req.body, {
    stripUnknown: true,
  })

  if (error) ApiError.MalformedContent(error.message)

  const packet = value as Partial<User>

  const user = await dao.users.update(uid, packet)

  res.pack(user)
}
