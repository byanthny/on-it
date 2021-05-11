import __axios from "axios"

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
