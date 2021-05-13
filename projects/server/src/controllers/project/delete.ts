import { Request, Response } from "../../types/express"
import dao from "../../dao"
import logger from "winston"

export const one = async (req: Request, res: Response) => {
  logger.info("ROUTES: project delete one")
  const { pid } = req.params

  const project = await dao.projects.delete(pid)

  res.pack(project)
}
