import { DuplicateError, MalformedContentError } from "../errors"
import { Request, Response } from "../types/express"
import logger from "winston"

const errorHandler = (error: Error, _: Request, res: Response, __: any) => {
  let message: string = error.message ?? "Unknown error"

  if (error instanceof MalformedContentError) res.status(400)
  else if (error instanceof DuplicateError) res.status(409)
  else if (error.message.match(/(authentication\s+failed|unauthorized)/i)) {
    res.status(401)
  } else {
    logger.info("unknown error", { error })
    res.status(500)
  }

  res.json({ error: message })
}

export default errorHandler
