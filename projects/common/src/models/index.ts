import { User, UserRole, userSchema } from "./User"
import { Tag, tagSchema } from "./Tag"
import { Task, taskSchema, TaskSearch, taskSearchSchema, TaskState } from "./Task"
import { Note, noteSchema } from "./Note"
import { nameSchema } from "./name"
import { ID, idSchema } from "./Model"
import { Limits, limitsSchema } from "./Limits"

const Schemae = {
  user: userSchema,
  tag: tagSchema,
  task: taskSchema,
  note: noteSchema,
  name: nameSchema,
  id: idSchema,
  admin: { limit: limitsSchema },
  search: {
    task: taskSearchSchema,
  },
}

export {
  User,
  UserRole,
  Tag,
  Task,
  TaskState,
  Note,
  ID,
  Limits,
  TaskSearch,
  Schemae,
}

