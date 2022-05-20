export type Document<ID = string> = { _id: ID }

export type SearchOptions = {
  limit?: number
  /** how many results to skip */
  skip?: number
}
