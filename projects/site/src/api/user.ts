import { axios } from "./axios"
import { ApiResponse, User } from "common"

export const register = async (
  email: string,
  password: string,
): Promise<{ user: User; token: string }> => {
  const {
    data: { payload, error },
  } = await axios.post<ApiResponse<{ user: User; token: string }>>(
    "/users/register",
    { email, password },
  )

  if (error) throw new Error(error)
  else if (!payload) throw new Error("Failed to retrieve user data")

  return payload
}

/** @param identity - display-name or email */
export const login = async (
  identity: string,
  password: string,
): Promise<{ user: User; token: string }> => {
  const {
    data: { payload, error },
  } = await axios.post<ApiResponse<{ user: User; token: string }>>(
    "/users/login",
    { identity, password },
  )

  if (error) throw new Error(error)
  else if (!payload) throw new Error("Failed to retrieve user data")

  return payload
}
