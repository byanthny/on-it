import { Request, Response } from "../../types/express"
import logger from "winston"
import dao from "../../dao"
import ApiError from "../../ApiError"
import Joi from "joi"
import { nameSchema } from "common"

export const one = async (req: Request, res: Response) => {
  logger.info("ROUTES: projects get one")

  const { pid } = req.params

  const project = await dao.projects.get(pid)

  if (project.uid !== req.user.id) ApiError.Authorization()

  res.pack(project)
}

export const many = async ({ query, user }: Request, { pack }: Response) => {
  logger.info("ROUTES: projects get many", { query })

  const { value, error } = Joi.object({ name: nameSchema }).validate(query, {
    stripUnknown: true,
  })

  if (error) ApiError.MalformedContent(error.message)

  const searchResult = await dao.projects.search({ ...value, uid: user.id! })

  pack(searchResult)
}
