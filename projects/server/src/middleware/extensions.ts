import { Response } from "../types/express"

export const attachPacketier = (_: any, res: Response, next: any) => {
  res.pack = (payload?: any) => res.json({ payload })
  res.error = (error?: string, code: number = 500) => {
    return res.status(code).json({ error })
  }
  next()
}
