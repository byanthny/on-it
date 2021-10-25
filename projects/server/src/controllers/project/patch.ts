import joi from "joi"
import { Request, Response } from "../../types/express"
import ApiError from "../../ApiError"
import dao from "../../dao"
import { projectSchema } from "common"
import logger from "winston"

export const one = async (
  { user, params: { pid }, body }: Request,
  res: Response
) => {
  logger.info("ROUTES: project update one")

  // get project
  const oldProject = await dao.projects.getByID(pid)

  // verify
  if (oldProject.uid !== user.id!) ApiError.Authorization()

  // Validate
  const { value, error } = joi.object({
    name: projectSchema.name.optional(),
    color: projectSchema.color,
  }).validate(body, { stripUnknown: true })

  if (error) ApiError.MalformedContent(error.message)

  // update
  const project = await dao.projects.update(pid, value.name, value.color)

  res.pack(project)
}
