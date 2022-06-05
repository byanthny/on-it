import { Request, Response } from "../types/express"
import log from "winston"
import { ApiError } from "common"

export const attachPacketier = (_: any, res: Response, next: any) => {
  res.pack = (payload?: any, meta?: any) => res.json({ payload, meta })
  res.error = (error: ApiError) => res.status(error.code).json({ error })
  next()
}

export const callLogger = (req: Request, _: Response, next: any) => {
  log.info(`${ req.method } ${ req.path }`)
  log.debug("", { params: req.params, query: req.query, body: req.body })
  next()
}
