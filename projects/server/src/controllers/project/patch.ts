import { object } from "joi"
import { Request, Response } from "../../types/express"
import ApiError from "../../errors"
import dao from "../../dao"
import { projectSchema } from "common"
import logger from "winston"

export const one = async (req: Request, res: Response) => {
  logger.info("ROUTES: project update one")
  const { pid } = req.params

  const { value, error } = object(projectSchema).validate(
    { ...req.body },
    { stripUnknown: true },
  )

  if (error) ApiError.MalformedContent(error.message)

  const project = await dao.projects.update(pid, value.name, value.color)

  res.pack(project)
}
