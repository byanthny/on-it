import { authSchema, User, UserRole, userSchema } from "./User"
import { Tag, tagSchema, tagSearchSchema, TagSearch } from "./Tag"
import { Task, taskSchema, TaskSearch, taskSearchSchema, TaskState } from "./Task"
import { Note, noteSchema, noteSearchSchema, NoteSearch } from "./Note"
import { ID, idSchema, nameSchema } from "./Model"
import { Limits, limitsSchema } from "./Limits"

const Schemae = {
  user: userSchema,
  tag: tagSchema,
  task: taskSchema,
  note: noteSchema,
  name: nameSchema,
  id: idSchema,
  auth: authSchema,
  admin: { limit: limitsSchema },
  search: {
    task: taskSearchSchema,
    tag: tagSearchSchema,
    note: noteSearchSchema,
  },
}

export {
  User,
  UserRole,
  Tag,
  Task,
  TaskState,
  TagSearch,
  Note,
  NoteSearch,
  ID,
  Limits,
  TaskSearch,
  Schemae,
}

