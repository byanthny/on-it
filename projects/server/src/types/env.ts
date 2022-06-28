import logger from "winston"

export type Env = {
  readonly PORT: string | number
  readonly NODE_ENV: "DEVELOPMENT" | "PRODUCTION"
  readonly MONGO_URI?: string
  readonly SESSION_SECRET: string
  readonly isDev: boolean
}

const env: Env = {
  PORT: process.env.PORT ?? 7100,
  NODE_ENV: process.env.NODE_ENV?.toUpperCase() === "DEVELOPMENT" ? "DEVELOPMENT" : "PRODUCTION",
  isDev: process.env.NODE_ENV?.toUpperCase() === "DEVELOPMENT",
  MONGO_URI: process.env.MONGO_URI,
  SESSION_SECRET: (() => {
    if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET
    else if (process.env.NODE_ENV === "DEVELOPMENT") return "abcd"
    else {
      logger.error("missing session secret env in production environment")
      process.exit(1)
    }
  })(),
}

export default env
