import { ID } from "common"

type Dao<T, SearchType = undefined> = {
  create(t: T): Promise<T>
  get(id: ID): Promise<T>
  search(search: SearchType): Promise<T[]>
  update(id: ID, t: Partial<T>): Promise<T>
  delete(id: ID): Promise<T>
}

export default Dao
