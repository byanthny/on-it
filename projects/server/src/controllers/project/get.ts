import { Request, Response } from "../../types/express"
import logger from "winston"
import dao from "../../dao"
import { AuthError } from "../../errors"

export const one = async (req: Request, res: Response) => {
  logger.info("ROUTES: projects get one")

  const { pid } = req.params

  const project = await dao.projects.getByID(pid)

  if (project._id! === req.user!._id!) throw new AuthError()

  res.pack(project)
}
