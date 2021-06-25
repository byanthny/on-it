import { ID } from "common"

type Dao<T, Search = undefined> {
  create(data: T): Promise<T>
  get(ID: ID): Promise<T>
  exists(id: ID): Promise<boolean>
  search(s: Search): Promise<T[]>
  update(id: ID, data: Partial<T>): Promise<T>
  delete(id: ID): Promise<T>
}

export default Dao