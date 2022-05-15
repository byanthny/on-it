export default class ApiError {
  name: string = "ApiError"
  code: number
  message?: string
  private constructor(code: number = 500, message?: string) {
    this.message = message
    this.code = code
  }

  static MalformedContent(msg?: string) {
    throw new ApiError(400, msg)
  }

  static Duplicate(msg?: string) {
    throw new ApiError(409, msg)
  }

  static Authentication(msg: string = "Authentication Failed") {
    throw new ApiError(401, msg)
  }

  static Authorization(msg: string = "Unauthorized") {
    throw new ApiError(403, msg)
  }

  static NotFound(msg: string = "Resource not found") {
    throw new ApiError(404, msg)
  }

  static Internal(msg: string = "Internal Error, try again later") {
    throw new ApiError(500, msg)
  }

  static TODO(msg: string = "Unimplemented") {
    ApiError.Internal(msg)
  }
}
