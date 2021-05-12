import { User } from "common"
import { Client, CurrentIdentity, Get } from "faunadb"
import { Document } from "../types/fauna"
import * as users from "./users"
import * as projects from "./projects"

/**
 * Attemps to get the User document for the given token
 */
const identify = async (token: string): Promise<User> => {
  const {
    data,
    ref: { id },
  } = await new Client({ secret: token }).query<Document<User>>(
    Get(CurrentIdentity()),
  )

  return { ...data, _id: id }
}

export default { identify, users, projects }
