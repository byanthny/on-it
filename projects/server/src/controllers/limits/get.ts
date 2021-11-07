import { Request, Response } from "../../types/express"
import dao from "../../dao"
import logger from "winston"
import { UserRole } from "common"

export const one = async (
  { params: { role } }: Request,
  { pack }: Response,
) => {
  logger.info("ROUTES: limits get one")

  const limits = await dao.limits.get(role.toUpperCase() as UserRole)

  pack(limits)
}

export const all = async (_: Request, { pack }: Response) => {
  logger.info("ROUTES: limits get all")

  const limits = await dao.limits.getAll()

  pack(limits)
}
