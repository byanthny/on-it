import { authSchema, User, UserRole, userSchema } from "./User"
import { Tag, tagSchema, tagSearchSchema, TagSearch } from "./Tag"
import { Task, taskSchema, TaskSearch, taskSearchSchema, TaskState } from "./Task"
import { Note, noteSchema } from "./Note"
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
  ID,
  Limits,
  TaskSearch,
  Schemae,
}

