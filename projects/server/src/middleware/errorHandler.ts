import { ApiErrors } from "../ApiError"
import { Request, Response } from "../types/express"
import logger from "winston"

const errorHandler = (error: any, _: Request, res: Response, __: any) => {
  logger.error("unknown error", { error })
  res.error(ApiErrors.Internal("an unknown error"))
}

export default errorHandler
