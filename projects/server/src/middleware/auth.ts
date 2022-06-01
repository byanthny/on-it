import dao from "../db"
import ApiError from "../ApiError"
import { Handler, Request, Response } from "../types/express"
import logger from "winston"
import { UserRole } from "common"

/**
 * @param required - Whether authentication is required. Pass a [UserRole] to
 *                    require authorization
 */
export function authentication(required: boolean | UserRole[] | "self" = true): Handler {
  return async (req: Request, _: Response, next: Function) => {
    if (req.session) {
      logger.debug("session provided", { session: req.session })
      req.user = await dao.users.get({ _id: req.session.uid })
    }

    if (required) {
      if (!req.session) ApiError.Authentication("unknown session")
      if (!req.user) ApiError.Authentication("unknown user")

      if (typeof required !== "boolean" && !required.includes(req.session.role)) {
        ApiError.Authorization("missing required user role")
      }
    }

    next()
  }
}