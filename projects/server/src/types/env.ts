import { config } from "dotenv"
import logger from "winston"

export type Env = {
  readonly PORT: number
  readonly NODE_ENV: "DEVELOPMENT" | "PRODUCTION"
  readonly MONGO_URI?: string
  readonly SESSION_SECRET: string
}

const { parsed, error } = config()

if (error) {
  logger.error("failed to load env variables", { error })
}

const env: Env = {
  PORT: parseInt(parsed.PORT ?? "7100"),
  NODE_ENV: parsed.NODE_ENV?.toUpperCase() === "DEVELOPMENT" ? "DEVELOPMENT" : "PRODUCTION",
  MONGO_URI: parsed.MONGO_URI,
  SESSION_SECRET: (() => {
    if (parsed.SESSION_SECRET) return parsed.SESSION_SECRET
    else if (parsed.NODE_ENV === "DEVELOPMENT") return "abcd"
    else {
      logger.error("missing session secret env in production environment")
      process.exit(1)
    }
  })(),
}

export default env
