import Express, { Application } from "express"
import cors from "cors"

export default (): Application => {
  const server = Express()

  // Setup external middleware
  server.use(Express.json())
  server.use(cors())

  // Setup base path public
  server.use((_, res) => {
    res.redirect("https://app.swaggerhub.com/apis-docs/JonoAugustine/OnIt")
  })

  // Setup docs path
  server.use("/docs", (_, res) => {
    res.redirect("https://app.swaggerhub.com/apis-docs/JonoAugustine/OnIt")
  })

  // TODO setup API paths

  return server
}
