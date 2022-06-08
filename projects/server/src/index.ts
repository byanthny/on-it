require("dotenv").config()
require("./logger")
require("express-async-errors")
import server from "./server"
import logger from "winston"

const port = process.env.PORT ?? 7100

async function main() {
  (await server()).listen(port, () => {
    logger.info(`listening on port ${ port }`)
    logger.debug(`http://127.0.0.1:${ port }`)
  })
}

main().catch()
