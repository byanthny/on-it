import { Map, Create, Get, Match, Paginate, Update, Var, Lambda } from "faunadb"
import { Document } from "../types/fauna"
import { Limits } from "common"
import db from "./root"
import collections from "./collections"
import indexes from "./indexes"
import { UserRole } from "common"

export const create = async (limits: Limits): Promise<Limits> => {
  const {
    data,
    ref: { id },
  } = await db.query<Document<Limits>>(
    Create(collections.limits, { data: limits }),
  )
  return { ...data, id }
}

export const get = async (role: UserRole) => {
  const {
    data,
    ref: { id },
  } = await db.query<Document<Limits>>(
    Get(Match(indexes.limits.byUniqueRole, role)),
  )
  return { ...data, id }
}

export const getAll = async (): Promise<Limits[]> => {
  const { data } = await db.query<{ data: Document<Limits>[] }>(
    Map(Paginate(Match(indexes.limits.all)), Lambda("ref", Get(Var("ref")))),
  )

  return data.map(({ data, ref: { id } }) => ({ ...data, id }))
}

export const update = async (role: UserRole, limits: Partial<Limits>) => {
  const {
    data: [doc],
  } = await db.query<{ data: Document<Limits>[] }>(
    Map(
      Paginate(Match(indexes.limits.byUniqueRole, role)),
      Lambda("ref", Update(Var("ref"), { data: limits })),
    ),
  )

  return { ...doc.data, id: doc.ref?.id }
}
