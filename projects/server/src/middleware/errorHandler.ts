import ApiError from "../ApiError"
import { Request, Response } from "../types/express"
import logger from "winston"

const errorHandler = (error: any, _: Request, res: Response, __: any) => {
  if (error.name == ApiError.name) {
    logger.debug("known error", { error })
    res.error(error.message, error.code)
    return
  } else {
    logger.info("unknown error", error)
    res.error("an unknown error", 500)
  }
}

export default errorHandler
