export type Filter<T> = { [key in keyof T]?: any }

export type DBResponse<T, M> = { data?: T, meta?: M }

export type SearchOptions = {
  limit?: number
  /** how many results to skip */
  skip?: number
}
