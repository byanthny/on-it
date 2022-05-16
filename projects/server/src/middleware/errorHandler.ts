import ApiError from "../ApiError"
import { Request, Response } from "../types/express"
import logger from "winston"


const errorHandler = (error: any, _: Request, res: Response, __: any) => {
  if (error.name == ApiError.name) {
    res.error(error.message, error.code)
    return
  }

  logger.debug("Non-native Error, continuing...", { error })

  if (error.message?.match(/(authentication\s+failed|unauthorized)/i)) {
    res.error(error.message, 401)
  } else if (error.message?.match(/instance\s+not\s+found/i)) {
    res.error(error.message, 404)
  } else if (error.message?.match(/instance\s+not\s+unique/i)) {
    res.error(error.message, 409)
  } else {
    logger.info("unknown error", { error })
    res.error(error.message)
  }
}

export default errorHandler
