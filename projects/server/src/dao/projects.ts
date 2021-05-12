import { Create } from "faunadb"
import { Document } from "../types/fauna"
import { Project, User } from "common"
import db from "./root"
import collections from "./collections"
import indexes from "./indexes"
import logger from "winston"

export const create = async (
  uid: string,
  name: string,
  color?: string,
): Promise<Project> => {
  const {
    data,
    ref: { id },
  } = await db.query<Document<Project>>(
    Create(collections.projects, { data: { uid, name, color } }),
  )
  return { ...data, _id: id }
}
