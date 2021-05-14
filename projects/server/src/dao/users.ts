import {
  Create,
  Delete,
  Expr,
  Get,
  IsNonEmpty,
  Let,
  Login,
  Match,
  Paginate,
  Ref,
  Select,
  Tokens,
  Union,
  Update,
  Var,
} from "faunadb"
import { Document } from "../types/fauna"
import { User } from "common"
import db from "./root"
import collections from "./collections"
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
  const {
    userDoc: {
      data,
      ref: { id },
    },
    tokenDoc,
  } = await db.query<FaunaAuthReturn>(
    Let(
      {
        userDoc: Create(collections.users, {
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
    user: { ...data, id },
    token: tokenDoc.secret,
  }
}

export const login = async (
  identity: string,
  password: string,
): Promise<Login> => {
  const {
    userDoc: {
      data,
      ref: { id },
    },
    tokenDoc,
  } = await db.query<FaunaAuthReturn>(
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
    user: { ...data, id },
    token: tokenDoc.secret,
  }
}

export const getByID = async (uid: string): Promise<User> => {
  const {
    data,
    ref: { id },
  } = await db.query<Document<User>>(Get(Ref(collections.users, uid)))

  return { ...data, id }
}

const existsByIndex = (index: Expr, identity: any) => {
  return db.query<boolean>(IsNonEmpty(Paginate(Match(index, identity))))
}

export const existsByEmail = (email: string) => {
  return existsByIndex(indexes.users.byUniqueEmail, email)
}

export const existsByDisplayName = (displayName: string) => {
  return existsByIndex(indexes.users.byUniqueDisplayName, displayName)
}

export const update = async (
  uid: string,
  packet: Partial<User>,
): Promise<User> => {
  const {
    data,
    ref: { id },
  } = await db.query<Document<User>>(
    Update(Ref(collections.users, uid), { data: packet }),
  )

  return { ...data, id }
}

const deleteUser = async (uid: string): Promise<void> => {
  await db.query(Delete(Ref(collections.users, uid)))
}

export { deleteUser as delete }
