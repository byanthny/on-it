import { Request as ExpressRequest, Response as ExpressResponse } from "express"
import { Session } from "express-session"
import { User, UserRole } from "common"

export type OnitSession = Session & {
  uid?: string
  role?: UserRole
}

export type Request = ExpressRequest & {
  sessionID?: string
  session?: OnitSession
  user?: User
}

export type Response = ExpressResponse & {
  pack(payload?: any, meta?: any): ExpressResponse<any, Record<string, any>>
  error(
    error?: string,
    code?: number,
  ): ExpressResponse<any, Record<string, any>>
}

export type Handler = (req: Request, res: Response, next: Function) => any

export type HandlerGroup = { [key: string]: Handler }