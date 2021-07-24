import { ID } from "common"
import ApiError from "../ApiError"

export default abstract class Dao<T, SearchType = undefined> {
  create(_t: T): Promise<T> {
    throw ApiError.Internal()
  }
  get(_id: ID): Promise<T> {
    throw ApiError.Internal()
  }
  search(_search: SearchType): Promise<T[]> {
    throw ApiError.Internal()
  }
  update(_id: ID, _t: Partial<T>): Promise<T> {
    throw ApiError.Internal()
  }
  delete(_id: ID): Promise<T> {
    throw ApiError.Internal()
  }
}
