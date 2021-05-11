import { Request, Response } from "../../types/express"
import dao from "../../dao"
import logger from "winston"

// TODO Secure user:get:one route
export const one = async (req: Request, res: Response) => {
  logger.info("ROUTES: user get one")
  const { uid } = req.params
  const user = await dao.users.getByID(uid)
  res.pack(user)
}
