require("dotenv").config()
require("express-async-errors")
import server from "./server"
import logger, { format, transports } from "winston"
import Env from "./types/env"

logger.configure({
  level: Env.NODE_ENV === "DEVELOPMENT" ? "debug" : "info",
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message, ...meta }) => {
      let s = `${ timestamp } [${ level }]: ${ message }`
      if (Object.keys(meta).length > 0) {
        s += `\n${ JSON.stringify(meta, null, 2) }`
      }
      return s
    }),
  ),
})

async function main() {
  (await server()).listen(Env.PORT, () => {
    logger.info(`listening on port ${ Env.PORT }`)
    logger.debug(`http://127.0.0.1:${ Env.PORT }`)
  })
}

main().catch()
