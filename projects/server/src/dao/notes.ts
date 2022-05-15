import {
  ContainsStr, Count,
  Create,
  Delete,
  Expr,
  Filter,
  Get,
  Intersection,
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
import { ID, Note, NoteSearch } from "common"
import db from "./client"
import collections from "./collections"
import indexes from "./indexes"


export const count = async (taskID: ID): Promise<number> => {
  return db.query<number>(Count(Match(indexes.notes.byParentID, taskID)))
}

export const create = async (note: Note<ID>): Promise<Note<ID>> => {
  const {
    data,
    ref: { id },
  } = await db.query<Document<Note<ID>>>(
    Create(collections.notes, { data: note }),
  )
  return { ...data, id }
}

export const getByID = async (nid: ID): Promise<Note<ID>> => {
  const {
    data,
    ref: { id },
  } = await db.query<Document<Note<ID>>>(Get(Ref(collections.notes, nid)))
  return { ...data, id }
}

export const search = async (
  uid: ID,
  search: NoteSearch,
): Promise<Note<ID>[]> => {
  const qs: Expr[] = [Match(indexes.notes.byUserID, uid)]

  if (search.parent) qs.push(Match(indexes.notes.byParentID, search.parent))
  if (search.tags) {
    for (const pid of search.tags) qs.push(Match(indexes.notes.byTagID, pid))
  }

  let expr = Map(Paginate(Intersection(...qs)), Lambda("ref", Get(Var("ref"))))

  if (search.title) {
    expr = Filter(
      expr,
      Lambda(
        "doc",
        ContainsStr(
          LowerCase(Select(["data", "title"], Var("doc"), search.title)),
          search.title.toLowerCase(),
        ),
      ),
    )
  }

  if (search.text) {
    expr = Filter(
      expr,
      Lambda(
        "doc",
        ContainsStr(
          LowerCase(Select(["data", "text"], Var("doc"), search.text)),
          search.text.toLowerCase(),
        ),
      ),
    )
  }

  const { data } = await db.query<{ data: Document<Note<ID>>[] }>(expr)

  return data.map(({ data, ref: { id } }) => ({ ...data, id }))
}

export const update = async (
  nid: ID,
  note: Partial<Note<ID>>,
): Promise<Note<ID>> => {
  const {
    data,
    ref: { id },
  } = await db.query<Document<Note<ID>>>(
    Update(Ref(collections.notes, nid), { data: note }),
  )
  return { ...data, id }
}

const _delete = async (nid: ID): Promise<Note<ID>> => {
  const {
    data,
    ref: { id },
  } = await db.query<Document<Note<ID>>>(Delete(Ref(collections.notes, nid)))
  return { ...data, id }
}

export { _delete as delete }
