import { Request, Response } from "../../types/express"
import ApiError from "../../errors"
import dao from "../../dao"
import logger from "winston"

export const one = async (
  { user, params: { nid } }: Request,
  { pack }: Response,
) => {
  logger.info("ROUTES: note delete one")

  ApiError.TODO()
}
