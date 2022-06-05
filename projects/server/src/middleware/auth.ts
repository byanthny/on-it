import dao from "../db"
import { ApiErrors } from "../ApiError"
import { Handler, Request, Response } from "../types/express"
import logger from "winston"
import { UserRole } from "common"

/**
 * @param required - Whether authentication is required. Pass a [UserRole] to
 *                    require authorization
 */
export function authentication(required: boolean | UserRole[] | "self" = true): Handler {
  return async (req: Request, { error }: Response, next: Function) => {
    if (req.session) {
      logger.debug("session provided", { session: req.session })
      req.session.user = await dao.users.get({ _id: req.session.uid })
      if (req.session.user) req.session.role = req.session.user.role
    }

    if (required) {
      if (!req.session) return error(ApiErrors.Authentication("missing session"))
      else if (!req.session.uid) return error(ApiErrors.Authentication("missing user id"))
      else if (!req.session.user) return error(ApiErrors.Authentication("unknown user"))
      else if (typeof required !== "boolean" && !required.includes(req.session.role)) {
        return error(ApiErrors.Authorization("missing required user role"))
      } else logger.debug("required auth validated")
    }

    next()
  }
}
