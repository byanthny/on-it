import dao from "../db"
import { ApiErrors } from "../ApiError"
import { Handler, Request, Response } from "../types/express"
import logger from "winston"
import { UserRole } from "common"
import { DBResultStatus } from "../db/types"

/**
 * @param required - Whether authentication is required. Pass a [UserRole] to
 *                    require authorization
 */
export function authentication(required: boolean | UserRole[] | "self" = true): Handler {
  return async (req: Request, { error }: Response, next: Function) => {
    if (req.session) {
      logger.debug("session provided", { session: req.session })
      const { status, data } = await dao.users.get({ _id: req.session.uid }, ["password"])
      if (status === DBResultStatus.SUCCESS) {
        req.session.user = data
        req.session.uid = data._id
        req.session.role = req.session.user.role
      }
    } else logger.debug("no session")

    if (required) {
      logger.debug("validating required session")
      if (!req.session) return error(ApiErrors.Authentication("missing session"))
      else if (!req.session.uid) {
        logger.info("session missing user id", { session: req.session })
        return error(ApiErrors.Authentication("session missing user id"))
      } else if (!req.session.user) return error(ApiErrors.Authentication("unknown user"))
      else if (typeof required !== "boolean" && !required.includes(req.session.role)) {
        return error(ApiErrors.Authorization("missing required user role"))
      } else logger.debug("required auth validated")
    }

    next()
  }
}
