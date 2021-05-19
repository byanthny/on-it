require("dotenv").config()
require("./logger")
require("express-async-errors")
import server from "./server"
import logger from "winston"

const port = process.env.PORT ?? 7000

server().listen(port, () => {
  logger.info(`listening on port ${port}`)
  logger.debug(`http://127.0.0.1:${port}`)
})
