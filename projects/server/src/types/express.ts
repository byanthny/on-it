import { Request as ExpressRequest, Response as ExpressResponse } from "express"
import { User } from "@common/models"

export type Request = ExpressRequest & {
  token?: string
  user?: User
}

export type Response = ExpressResponse & {
  pack: (payload?: any) => ExpressResponse<any, Record<string, any>>
  error: (error?: string) => ExpressResponse<any, Record<string, any>>
}