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
import { ID, Note } from "common"
import db from "./root"
import collections from "./collections"
import indexes from "./indexes"

export const create = async (note: Note<ID>): Promise<Note<ID>> => {
  const {
    data,
    ref: { id },
  } = await db.query<Document<Note<ID>>>(
    Create(collections.notes, { data: note }),
  )
  return { ...data, id }
}
