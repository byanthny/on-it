require("dotenv").config()
require("./logger")
import "express-async-errors"
import server from "./server"
import logger from "winston"

server().listen(process.env.PORT, () => {
  logger.info(`listening on port ${process.env.PORT}`)
  if (process.env.STAGE !== "PRODUCTION") {
    logger.info(`127.0.0.1:${process.env.PORT}`)
  }
})
