import { object } from "joi"
import { Request, Response } from "../../types/express"
import ApiError from "../../errors"
import dao from "../../dao"
import { projectSchema } from "common"
import logger from "winston"

export const one = async (req: Request, res: Response) => {
  logger.info("ROUTES: project create one")

  const { value, error } = object(projectSchema).validate(
    { ...req.body, uid: req.user!.id! },
    { stripUnknown: true },
  )

  if (error) ApiError.MalformedContent(error.message)

  const project = await dao.projects.create(value.uid, value.name, value.color)
  logger.debug("Project Created", project)

  res.pack(project)
}
