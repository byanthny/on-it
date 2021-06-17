import { Request, Response } from "../types/express"
import log from "winston"

export const attachPacketier = (_: any, res: Response, next: any) => {
  res.pack = (payload?: any) => res.json({ payload })
  res.error = (error?: string, code: number = 500) => {
    return res.status(code).json({ error })
  }
  next()
}

export const logger = (req: Request, _: Response, next: any) => {
  log.info(`${req.method} ${req.path}`)
  next()
}