import dao from "../dao"
import ApiError from "../ApiError"
import { Handler, Request, Response } from "../types/express"
import logger from "winston"
import { UserRole } from "common"


/**
 *
 * @param required - Whether authentication is required. Pass a [UserRole] to
 *                    require authorization
 */
export function authentication(required: boolean | UserRole = true): Handler {
  return async (req: Request, _: Response, next: Function) => {
    const { token } = req.headers
    if (typeof token === "string" && token.length > 0) {
      // set token
      req.token = token
      // get user
      req.user = await dao.identify(token)
      logger.debug("Authenticated", { user: req.user })
    }

    if (required) {
      if (!req.token) ApiError.Authentication("missing token")
      if (!req.user) ApiError.Authentication("invalid token")

      if (typeof required !== "boolean" && req.user!.role !== required) {
        ApiError.Authorization("missing required user role")
      }
    }

    next()
  }
}