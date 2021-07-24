import { User } from "common"
import { CurrentIdentity, Get } from "faunadb"
import { Document } from "../types/fauna"
import * as users from "./users"
import * as projects from "./projects"
import * as tasks from "./tasks"
import * as notes from "./notes"
import { LimitDao } from "./internal"
import db from "./root"

/** Attempts to get the User document for the given token */
const identify = async (token: string): Promise<User> => {
  const {
    data,
    ref: { id },
  } = await db.query<Document<User>>(Get(CurrentIdentity()), { secret: token })
  return { ...data, id }
}

export default {
  identify,
  users,
  projects,
  tasks,
  notes,
  internal: { limits: new LimitDao() },
}
