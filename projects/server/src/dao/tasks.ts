import {
  Create,
  Delete,
  Exists,
  Expr,
  Get,
  Intersection,
  Lambda,
  Map,
  Match,
  Paginate,
  Ref,
  Update,
  Var,
} from "faunadb"
import { Document } from "../types/fauna"
import { Task, ID, TaskSearch } from "common"
import db from "./root"
import collections from "./collections"
import indexes from "./indexes"

export const create = async (task: Task<ID>): Promise<Task<ID>> => {
  const {
    data,
    ref: { id },
  } = await db.query<Document<Task<ID>>>(
    Create(collections.tasks, { data: task }),
  )
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

export const searchForTask = async (
  uid: ID,
  search: TaskSearch,
): Promise<Task<ID>[]> => {
  const qs: Expr[] = [
    Match(indexes.tasks.all),
    Match(indexes.tasks.byUserID, uid),
  ]

  if (search.parent) qs.push(Match(indexes.tasks.byParentID, search.parent))
  if (search.state) qs.push(Match(indexes.tasks.byState, search.state))
  if (search.tags) {
    for (const pid of search.tags) {
      qs.push(Match(indexes.tasks.byTagID, pid))
    }
  }

  const { data } = await db.query<{ data: Document<Task<ID>>[] }>(
    Map(Paginate(Intersection(...qs)), Lambda("ref", Get(Var("ref")))),
  )

  return data.map(({ data, ref: { id } }) => ({ ...data, id }))
}

export const update = async (
  tid: string,
  task: Partial<Task<ID>>,
): Promise<Task<ID>> => {
  const {
    data,
    ref: { id },
  } = await db.query<Document<Task<ID>>>(
    Update(Ref(collections.tasks, tid), { data: task }),
  )
  return { ...data, id }
}

const _delete = async (tid: ID): Promise<Task<ID>> => {
  const {
    data,
    ref: { id },
  } = await db.query<Document<Task<ID>>>(Delete(Ref(collections.tasks, tid)))
  return { ...data, id }
}

export { _delete as delete }
