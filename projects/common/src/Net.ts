import Joi from "joi"

export type ApiResponse<T = void> = {
  payload?: T
  meta?: any
  error?: ApiError
}

export type ApiError = {
  readonly code: number
  readonly message?: string
}

export type SearchQuery<T> = {
  search: T,
  options: SearchOptions
}

export type SearchOptions = {
  limit?: number
  /** how many results to skip */
  skip?: number
}

export const searchOptionSchema = {
  limit: Joi.number().integer().min(1).max(10000).optional(),
  skip: Joi.number().integer().min(0).optional(),
}
