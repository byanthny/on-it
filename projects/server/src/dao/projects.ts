import { Create, Delete, Exists, Get, Ref, Update } from "faunadb"
import { Document } from "../types/fauna"
import { Project } from "common"
import db from "./root"
import collections from "./collections"

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
  return { ...data, id }
}

export const getByID = async (pid: string): Promise<Project> => {
  const {
    data,
    ref: { id },
  } = await db.query<Document<Project>>(Get(Ref(collections.projects, pid)))
  return { ...data, id }
}

export const existsByID = (pid: string): Promise<boolean> => {
  return db.query<boolean>(Exists(Ref(collections.projects, pid)))
}

export const update = async (
  pid: string,
  name: string,
  color: string,
): Promise<Project> => {
  const {
    data,
    ref: { id },
  } = await db.query<Document<Project>>(
    Update(Ref(collections.projects, pid), { data: { name, color } }),
  )
  return { ...data, id }
}

const _delete = async (pid: string): Promise<Project> => {
  const {
    data,
    ref: { id },
  } = await db.query<Document<Project>>(Delete(Ref(collections.projects, pid)))
  return { ...data, id }
}

export { _delete as delete }
