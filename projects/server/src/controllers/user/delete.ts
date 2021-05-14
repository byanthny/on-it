import { Request, Response } from "../../types/express"
import dao from "../../dao"
import logger from "winston"
import ApiError from "../../errors"

export const one = async (req: Request, res: Response) => {
  logger.info("ROUTES: user patch one")
  const { uid } = req.params

  if (uid !== req.user!.id!) ApiError.Authorization()

  await dao.users.delete(uid)

  res.pack("User deleted")
}
