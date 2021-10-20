import { ID } from "common"
import ApiError from "../ApiError"

export default abstract class Dao<T, SearchType = undefined> {
  create(_t: T): Promise<T> {
    throw ApiError.TODO()
  }
  get(_id: ID): Promise<T> {
    throw ApiError.TODO()
  }
  search(_search: SearchType): Promise<T[]> {
    throw ApiError.TODO()
  }
  update(_id: ID, _t: Partial<T>): Promise<T> {
    throw ApiError.TODO()
  }
  delete(_id: ID): Promise<T> {
    throw ApiError.TODO()
  }
}
