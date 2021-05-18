import {
  ContainsStr,
  Create,
  Delete,
  Exists,
  Expr,
  Filter,
  Get,
  Intersection,
  Lambda,
  LowerCase,
  Map,
  Match,
  Or,
  Paginate,
  Ref,
  Select,
  Update,
  Var,
} from "faunadb"
import { Document } from "../types/fauna"
import { ID, Note } from "common"
import db from "./root"
import collections from "./collections"
import indexes from "./indexes"
import { NoteSearch } from "common/src/Note"
import logger from "winston"

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
  const qs: Expr[] = [Match(indexes.tasks.byUserID, uid)]

  if (search.parent) qs.push(Match(indexes.tasks.byParentID, search.parent))
  if (search.tags) {
    for (const pid of search.tags) qs.push(Match(indexes.tasks.byTagID, pid))
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

  logger.debug("note search", { search, expr })

  const { data } = await db.query<{ data: Document<Note<ID>>[] }>(expr)

  return data.map(({ data, ref: { id } }) => ({ ...data, id }))
}
