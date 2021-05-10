import { Response } from "express"

export const attachPacketier = (_, res: Response, next) => {
  res["pack"] = (payload: any) => res.json({ payload })
  res["error"] = (error: string) => res.json({ error })
  next()
}
