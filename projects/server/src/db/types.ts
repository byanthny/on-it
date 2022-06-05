export type Filter<T> = { [key in keyof T]?: any }

export type SearchOptions = {
  limit?: number
  /** how many results to skip */
  skip?: number
}

export enum DBResultStatus {
  SUCCESS,
  FAILURE_NO_MATCH,
  FAILURE_INTERNAL,
}

export type DBResult<T> = {
  status: DBResultStatus
  data?: T
}
