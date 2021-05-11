import { Request, Response } from "../../types/express"
import dao from "../../dao"
import logger from "winston"
import { AuthError } from "../../errors"

export const one = async (req: Request, res: Response) => {
  logger.info("ROUTES: user patch one")
  const { uid } = req.params

  if (uid !== req.user!._id!) throw new AuthError()

  await dao.users.delete(uid)

  res.pack("User deleted")
}
