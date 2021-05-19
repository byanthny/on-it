import { Request, Response } from "../../types/express"
import dao from "../../dao"
import logger from "winston"
import ApiError from "../../errors"

export const one = async (
  { user, params: { pid } }: Request,
  { pack }: Response
) => {
  logger.info("ROUTES: project delete one")

  // get
  const project = await dao.projects.getByID(pid)

  // verify
  if (project.uid !== user.id!) ApiError.Authorization()

  // delete
  await dao.projects.delete(pid)

  pack(project)
}
