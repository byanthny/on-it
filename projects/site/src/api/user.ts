import { apiRequest, axios } from "./axios"
import { ID, User } from "common"

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
  uid: ID,
): Promise<User | undefined> =>
  apiRequest<User>(axios.get(`/users/${uid}`, { headers: { token } }))

export const updateUser = async (
  token: string,
  uid: ID,
  user: Partial<User>,
): Promise<User> =>
  apiRequest(axios.patch(`/users/${uid}`, user, { headers: { token } }))
