import { Index } from "faunadb"
import { INDEXES } from "./names.json"

export default Object.freeze({
  users: {
    byUniqueEmail: Index(INDEXES.USER.UNIQUE_EMAIL),
    byUniqueDisplayName: Index(INDEXES.USER.UNIQUE_NAME_DISPLAY),
  },
  tasks: {
    all: Index(INDEXES.TASK.ALL),
    byUserID: Index(INDEXES.TASK.USER_ID),
    byParentID: Index(INDEXES.TASK.PARENT_ID),
    byState: Index(INDEXES.TASK.STATE),
    byTagID: Index(INDEXES.TASK.TAG_ID),
  },
})
