import { Request as ExpressRequest, Response as ExpressResponse } from "express"
import { Session } from "express-session"
import { User, UserRole, ApiError } from "common"

export type OnitSession = Session & {
  uid?: string
  role?: UserRole
  user?: User
}

export type Request = ExpressRequest & {
  sessionID?: string
  session?: OnitSession
}

export type Response = ExpressResponse & {
  pack(payload?: any, meta?: any): void
  error(error: ApiError): void
}

export type Handler = (req: Request, res: Response, next: Function) => any

export type HandlerGroup = { [key: string]: Handler }
