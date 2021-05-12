import __axios, { AxiosResponse } from "axios"
import { ApiResponse } from "common"

const API_URI = `http://${
  process.env.NODE_ENV === "production"
    ? "on-it-api.herokuapp.com"
    : "127.0.0.1:7000"
}/api`

export const axios = __axios.create({
  baseURL: API_URI,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: (status) => {
    return status > 0
  },
})

export const apiRequest = async <T>(
  request: Promise<AxiosResponse<ApiResponse<T>>>,
): Promise<T> => {
  const {
    data: { payload, error },
  } = await request
  if (error) throw new Error(error)
  return payload!
}
