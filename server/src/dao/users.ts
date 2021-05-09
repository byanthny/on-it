import { Collection, Create, Let, Select, Tokens, Var } from "faunadb"
import db from "./root"
import NAMES from "./names.json"
import { Document } from "../types/fauna"
import { User } from "@common/models"

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
