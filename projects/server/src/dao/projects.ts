import {
  ContainsStr,
  Count,
  Create,
  Delete,
  Exists,
  Filter,
  Get,
  Lambda,
  LowerCase,
  Map,
  Match,
  Paginate,
  Ref,
  Select,
  Update,
  Var,
} from "faunadb"
import { Document } from "../types/fauna"
import { ID, Project, ProjectSearch } from "common"
import db from "./client"
import collections from "./collections"
import indexes from "./indexes"


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

export const search = async (
  uid: ID,
  search: ProjectSearch,
): Promise<Project[]> => {
  let expression = Map(
    Paginate(Match(indexes.projects.byUserID, uid)),
    Lambda("ref", Get(Var("ref"))),
  )

  if (search.name) {
    expression = Filter(
      expression,
      Lambda(
        "doc",
        ContainsStr(
          LowerCase(Select(["data", "name"], Var("doc"))),
          search.name.toLowerCase(),
        ),
      ),
    )
  }

  const { data } = await db.query<{ data: Document<Project>[] }>(expression)

  return data.map(({ data, ref: { id } }) => ({ ...data, id }))
}

export const count = async (uid: ID): Promise<number> => {
  return db.query<number>(Count(Match(indexes.projects.byUserID, uid)))
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
