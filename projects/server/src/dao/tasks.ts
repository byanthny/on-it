import { Create, Exists, Get, Ref } from "faunadb"
import { Document } from "../types/fauna"
import { Task, ID } from "common"
import db from "./root"
import collections from "./collections"
import logger from "winston"

export const create = async (task: Task<ID>): Promise<Task<ID>> => {
  const {
    data,
    ref: { id },
  } = await db.query<Document<Task<ID>>>(
    Create(collections.tasks, { data: task }),
  )
  logger.debug("DAO: task created", { task, data })
  return { ...data, id }
}

export const getByID = async (tid: ID): Promise<Task<ID>> => {
  const {
    data,
    ref: { id },
  } = await db.query<Document<Task<ID>>>(Get(Ref(collections.tasks, tid)))
  return { ...data, id }
}

export const existsByID = async (tid: ID): Promise<boolean> => {
  return db.query(Exists(Ref(collections.tasks, tid)))
}
