import { transports, configure, format } from "winston"

configure({
  level: process.env.STAGE === "PRODUCTION" ? "info" : "debug",
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message, ...meta }) => {
      let s = `${timestamp} [${level}]: ${message}`
      if (Object.keys(meta).length > 0) {
        s += `\n${JSON.stringify(meta, null, 2)}`
      }
      return s
    }),
  ),
})
