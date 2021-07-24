import { Create, Get, Match, Update } from "faunadb"
import { Document } from "../../types/fauna"
import { Limits } from "common"
import db from "../root"
import collections from "../collections"
import indexes from "../indexes"
import Dao from "../Dao"
import { UserRole } from "common/src/User"

export default class LimitDao extends Dao<Limits> {
  async create(limits: Limits) {
    const {
      data,
      ref: { id },
    } = await db.query<Document<Limits>>(
      Create(collections.limits, { data: limits }),
    )
    return { ...data, id }
  }

  async get(role: UserRole) {
    const {
      data,
      ref: { id },
    } = await db.query<Document<Limits>>(
      Get(Match(indexes.limits.byUniqueRole, role)),
    )
    return { ...data, id }
  }

  async update(role: UserRole, limits: Partial<Limits>) {
    const {
      data,
      ref: { id },
    } = await db.query<Document<Limits>>(
      Update(Match(indexes.limits.byUniqueRole, role), { data: limits }),
    )
    return { ...data, id }
  }
}
