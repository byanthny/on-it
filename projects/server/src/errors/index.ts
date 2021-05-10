export class MalformedContentError extends Error {
  constructor(msg?: string) {
    super(msg)
  }
}

export class InternalError extends Error {
  message = "Internal Error, try again later."
}

export class DuplicateError extends Error {
  constructor(message?: string) {
    super(message)
  }
}

export class AuthError extends Error {
  constructor(message: string = "Unauthorized") {
    super(message)
  }
}

export class ResourceNotFoundError extends Error {
  constructor(message: string = "Resource not found") {
    super(message)
  }
}
