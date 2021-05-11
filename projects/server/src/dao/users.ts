import {
  Collection,
  Create,
  Expr,
  Get,
  IsNonEmpty,
  Let,
  Login,
  Match,
  Paginate,
  Select,
  Tokens,
  Union,
  Var,
} from "faunadb"
import { Document } from "../types/fauna"
import { User } from "common"
import db from "./root"
import NAMES from "./names.json"
import indexes from "./indexes"
import logger from "winston"

type Login = {
  user: User
  token: string
}

type FaunaAuthReturn = {
  userDoc: Document<User>
  tokenDoc: { secret: string }
}

export const register = async (
  email: string,
  password: string,
): Promise<Login> => {
  logger.debug("DAO: register")
  const { userDoc, tokenDoc } = await db.query<FaunaAuthReturn>(
    Let(
      {
        userDoc: Create(Collection(NAMES.COLLECTIONS.USERS), {
          credentials: { password: password },
          data: { email: email },
        }),
      },
      {
        userDoc: Var("userDoc"),
        tokenDoc: Create(Tokens(), { instance: Select("ref", Var("userDoc")) }),
      },
    ),
  )

  return {
    user: { ...userDoc!.data, _id: userDoc.ref!.id },
    token: tokenDoc.secret,
  }
}

export const login = async (
  identity: string,
  password: string,
): Promise<Login> => {
  const { userDoc, tokenDoc } = await db.query<FaunaAuthReturn>(
    Let(
      {
        tokenDoc: Login(
          // Union b/c either index can only return 1, and if they both return
          // it has to be the same document
          Union(
            Match(indexes.users.byUniqueDisplayName, identity),
            Match(indexes.users.byUniqueEmail, identity),
          ),
          { password },
        ),
      },
      {
        tokenDoc: Var("tokenDoc"),
        userDoc: Get(Select("instance", Var("tokenDoc"))),
      },
    ),
  )

  return {
    user: { ...userDoc.data, _id: userDoc.ref.id },
    token: tokenDoc.secret,
  }
}

const existsByIndex = (index: Expr, identity: any) => {
  return db.query<boolean>(IsNonEmpty(Paginate(Match(index, identity))))
}

export const existsByEmail = (email: string) => {
  return existsByIndex(indexes.users.byUniqueEmail, email)
}
