import joi from "joi"
import { Request, Response } from "../../types/express"
import ApiError from "../../ApiError"
import dao from "../../dao"
import { projectSchema } from "common"
import logger from "winston"

export const one = async ({ user, body }: Request, res: Response) => {
  logger.info("ROUTES: project create one")

  const { value, error } = joi.object(projectSchema).validate(body, {
    stripUnknown: true,
  })

  if (error) ApiError.MalformedContent(error.message)

  const project = await dao.projects.create(user.id!, value.name, value.color)
  logger.debug("Project Created", project)

  res.pack(project)
}
