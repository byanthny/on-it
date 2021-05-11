import { DuplicateError, MalformedContentError } from "../errors"
import { Request, Response } from "../types/express"

const errorHandler = (error: Error, _: Request, res: Response, __: any) => {
  let message: string = error.message ?? "Unknown error"

  if (error instanceof MalformedContentError) res.status(400)
  else if (error instanceof DuplicateError) res.status(409)
  else res.status(500)

  res.error(message)
}

export default errorHandler
