import { Index } from "faunadb"
import { INDEXES } from "./names.json"

export default Object.freeze({
  users: {
    byUniqueEmail: Index(INDEXES.USER.UNIQUE_EMAIL),
    byUniqueDisplayName: Index(INDEXES.USER.UNIQUE_NAME_DISPLAY),
  },
})
