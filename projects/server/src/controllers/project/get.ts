import { Request, Response } from "../../types/express"
import logger from "winston"
import dao from "../../dao"
import ApiError from "../../errors"

export const one = async (req: Request, res: Response) => {
  logger.info("ROUTES: projects get one")

  const { pid } = req.params

  const project = await dao.projects.getByID(pid)

  if (project.uid !== req.user.id) ApiError.Authorization()

  res.pack(project)
}
