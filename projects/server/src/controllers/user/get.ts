import { Request, Response } from "../../types/express"
import dao from "../../dao"
import logger from "winston"
import ApiError from "../../ApiError"

export const one = async (
  { user, params: { uid } }: Request,
  { pack }: Response
) => {
  logger.info("ROUTES: user get one")

  // Verify
  if (uid !== user.id!) ApiError.Authorization()

  // Get
  const userData = await dao.users.getByID(uid)
  pack(userData)
}
