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
  Var,
} from "faunadb"
import { Document } from "../types/fauna"
import { User } from "common"
import db from "./root"
import NAMES from "./names.json"
import indexes from "./indexes"
import logger from "winston"
import user from "../controllers/user"

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

const login = async (
  { identity, password }: { identity: string; password: string },
  index: Expr,
): Promise<Login> => {
  const { userDoc, tokenDoc } = await db.query<FaunaAuthReturn>(
    Let(
      { tokenDoc: Login(Match(index, identity), { password }) },
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

export const loginWithDisplayName = ({
  username,
  password,
}: {
  username: string
  password: string
}) => {
  return login({ password, identity: username }, indexes.users.byDisplayName)
}

export const loginWithEmail = ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  return login({ password, identity: email }, indexes.users.byEmail)
}

const existsByIndex = (index: Expr, identity: any) => {
  return db.query<boolean>(IsNonEmpty(Paginate(Match(index, identity))))
}

export const existsByEmail = (email: string) => {
  return existsByIndex(indexes.users.byEmail, email)
}
