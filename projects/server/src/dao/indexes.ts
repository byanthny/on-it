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
  projects: {
    all: Index(INDEXES.PROJECT.ALL),
    byName: Index(INDEXES.PROJECT.NAME),
    byUserID: Index(INDEXES.PROJECT.USER_ID),
    byUniqueNameAndUserID: Index(INDEXES.PROJECT.UNIQUE_NAME_AND_USER),
  },
  notes: {
    all: Index(INDEXES.NOTE.ALL),
    byUserID: Index(INDEXES.NOTE.USER_ID),
    byParentID: Index(INDEXES.NOTE.PARENT_ID),
    byTagID: Index(INDEXES.NOTE.TAG_ID),
  },
})
