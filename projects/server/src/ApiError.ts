import { ApiError } from "common"

export function errorOf(code: number, message?: string): ApiError {
  return { code, message }
}

export const ApiErrors = {
  MalformedContent: (message?: string) => errorOf(400, message),
  Authentication: (message = "Authentication Failed") => errorOf(401, message),
  Authorization: (message = "Unauthorized") => errorOf(403, message),
  NotFound: (message?: string) => errorOf(404, message),
  Duplicate: (message?: string) => errorOf(409, message),
  Internal: (message = "Internal Error") => errorOf(500, message),
  TODO: (message = "Unimplemented") => errorOf(501, message),
}
