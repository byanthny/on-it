import logger from "winston"

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

export const NoMatchResult: DBResult<null> = { status: DBResultStatus.FAILURE_NO_MATCH }
export const InternalFailureResult: DBResult<null> = { status: DBResultStatus.FAILURE_INTERNAL }

export function successResultOf<T>(data?: T): DBResult<T> {
  return { status: DBResultStatus.SUCCESS, data }
}

export async function runCatching<T>(
  location: string,
  lambda: () => DBResult<T> | Promise<DBResult<T>>,
): Promise<DBResult<T>> {
  try {
    return await lambda()
  } catch (error) {
    logger.error(location, { error })
    return InternalFailureResult
  }
}
