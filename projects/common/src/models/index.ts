import { User, UserRole, userSchema } from "./User"
import { Tag, tagSchema } from "./Tag"
import { Task, taskSchema, TaskState } from "./Task"
import { Note, noteSchema } from "./Note"
import { nameSchema } from "./name"
import { idSchema } from "./Model"
import { ID } from "./Model"
import { Limits, limitsSchema } from "./Limits"

const Schemae = {
  user: userSchema,
  tag: tagSchema,
  task: taskSchema,
  note: noteSchema,
  name: nameSchema,
  id: idSchema,
  admin: { limit: limitsSchema },
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
  Schemae,
}

