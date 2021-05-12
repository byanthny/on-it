import { apiRequest, axios } from "./axios"
import { User } from "common"

export const register = async (
  email: string,
  password: string,
): Promise<{ user: User; token: string }> =>
  apiRequest<{ user: User; token: string }>(
    axios.post("/users/register", {
      email,
      password,
    }),
  )

/** @param identity - display-name or email */
export const login = async (
  identity: string,
  password: string,
): Promise<{ user: User; token: string }> =>
  apiRequest<{ user: User; token: string }>(
    axios.post("/users/login", { identity, password }),
  )

export const getUser = async (
  token: string,
  uid: string,
): Promise<User | undefined> =>
  apiRequest<User>(axios.get(`/users/${uid}`, { headers: { token } }))
