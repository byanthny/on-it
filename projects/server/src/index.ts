require("dotenv").config()
require("express-async-errors")
import server from "./server"
import logger, { format, transports } from "winston"

logger.configure({
  level: process.env.STAGE === "DEVELOPMENT" ? "debug" : "info",
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

const port = process.env.PORT ?? 7100

async function main() {
  (await server()).listen(port, () => {
    logger.info(`listening on port ${ port }`)
    logger.debug(`http://127.0.0.1:${ port }`)
  })
}

main().catch()
