import { transports, configure, format } from "winston"

configure({
  level: process.env.STAGE === "PRODUCTION" ? "info" : "debug",
  transports: [new transports.Console()],
  format: format.simple(),
})
