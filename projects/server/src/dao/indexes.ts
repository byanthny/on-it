import { Index } from "faunadb"
import { INDEXES } from "./names.json"

export default Object.freeze({
  users: {
    byEmail: Index(INDEXES.USER.UNIQUE_EMAIL),
  },
})