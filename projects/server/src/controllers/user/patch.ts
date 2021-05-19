import { Request, Response } from "../../types/express"
import dao from "../../dao"
import logger from "winston"
import { User, userSchema } from "common"
import Joi from "joi"
import ApiError from "../../errors"

export const one = async (
  { params: { uid }, body, user }: Request,
  { pack }: Response
) => {
  logger.info("ROUTES: user patch one")

  // Verify
  if (uid !== user.id!) ApiError.Authorization()

  // validate
  const { value, error } = Joi.object(userSchema).validate(body, {
    stripUnknown: true,
  })

  if (error) ApiError.MalformedContent(error.message)

  // update
  const packet = value as Partial<User>

  const updatedUser = await dao.users.update(uid, packet)

  pack(updatedUser)
}
