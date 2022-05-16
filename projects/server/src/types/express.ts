import { Request as ExpressRequest, Response as ExpressResponse } from "express"
import { User } from "common"

export type Request = ExpressRequest & {
  token?: string
  user?: User
}

export type Response = ExpressResponse & {
  pack(payload?: any): ExpressResponse<any, Record<string, any>>
  error(
    error?: string,
    code?: number,
  ): ExpressResponse<any, Record<string, any>>
}

export type Handler = (req: Request, res: Response, next: Function) => any
