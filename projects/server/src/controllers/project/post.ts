import { object, string } from "joi"
import { Request, Response } from "../../types/express"
import { MalformedContentError } from "../../errors"
import dao from "../../dao"
import { projectSchema } from "common"
import logger from "winston"

export const one = async (req: Request, res: Response) => {
  logger.info("ROUTES: project create one")

  const { value, error } = object(projectSchema).validate(
    { ...req.body, uid: req.user!._id! },
    { stripUnknown: true },
  )

  if (error) throw new MalformedContentError(error.message)

  const project = await dao.projects.create(value.uid, value.name, value.color)
  logger.debug("Project Created", project)

  res.pack(project)
}
