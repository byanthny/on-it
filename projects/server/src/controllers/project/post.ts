import joi from "joi"
import { Request, Response } from "../../types/express"
import ApiError from "../../ApiError"
import dao from "../../dao"
import { projectSchema, UserRole } from "common"
import logger from "winston"

export const one = async ({ user, body }: Request, res: Response) => {
  logger.info("ROUTES: project create one")

  const { value, error } = joi.object(projectSchema).validate(body, {
    stripUnknown: true,
  })

  if (error) ApiError.MalformedContent(error.message)

  // check limits
  const limit = await dao.limits.get(user.role || UserRole.GENERIC)
  const count = await dao.projects.count(user.id!)

  if (count === limit.projects.max) {
    ApiError.MalformedContent(`max projects reached (${limit.projects.max})`)
  }

  const project = await dao.projects.create(user.id!, value.name, value.color)
  logger.debug("Project Created", project)

  res.pack(project)
}
