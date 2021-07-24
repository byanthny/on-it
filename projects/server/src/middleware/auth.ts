import dao from "../dao"
import ApiError from "../ApiError"
import { Handler, Request } from "../types/express"
import logger from "winston"
import { UserRole } from "common/src/User"

/**
 * Attempts to set token and user onto Request.
 */
export const readToken = async (req: Request, _: any, next: any) => {
  const { token } = req.headers
  if (typeof token === "string" && token.length > 0) {
    // set token
    req.token = token
    // get user
    req.user = await dao.identify(token)
    logger.debug("Authenticated", { user: req.user })
  }
  next()
}

/** Throws an AuthError if no user is set */
export const requireUser: Handler = (req, _, next) => {
  if (!req.token) ApiError.Authentication("missing token")
  if (!req.user) ApiError.Authentication("invalid token")
  next()
}

export const requireRole: (role: UserRole) => Handler = (role) => {
  return ({ user }, _, next) => {
    if (user!.role !== role)
      ApiError.Authorization("missing required user role")
    next()
  }
}
