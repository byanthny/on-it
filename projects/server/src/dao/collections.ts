import { Collection } from "faunadb"
import { COLLECTIONS } from "./names.json"

export default Object.freeze({
  users: Collection(COLLECTIONS.USERS),
  projects: Collection(COLLECTIONS.PROJECTS),
  tasks: Collection(COLLECTIONS.TASKS),
})
