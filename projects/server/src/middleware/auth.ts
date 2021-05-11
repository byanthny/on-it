import dao from "../dao"
import { AuthError } from "../errors"
import { Request } from "../types/express"

/**
 * Attempts to set token and user onto Request.
 */
export const readToken = async (req: Request, _: any, next: any) => {
  const { token } = req.headers
  if (typeof token === "string") {
    // set token
    req.token = token
    // get user
    req.user = await dao.identify(token)
  }
  next()
}

/** Throws an AuthError if no user is set */
export const requireUser = (req: Request, _: any, next: any) => {
  if (!req.user) throw new AuthError()
  next()
}
