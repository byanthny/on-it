import { ApiError } from "common"
import { DBResultStatus } from "../db/types"
import { ApiErrors } from "../ApiError"

/**
 * Returns the appropriate ApiError or null if successful
 */
export function reduceDBResultStatus(status: DBResultStatus): ApiError | null {
  switch (status) {
    case DBResultStatus.SUCCESS:
      return null
    case DBResultStatus.FAILURE_NO_MATCH:
      return ApiErrors.NotFound()
    case DBResultStatus.FAILURE_INTERNAL:
      return ApiErrors.Internal()
    default:
      return ApiErrors.Internal()
  }
}
