import Express, { Application, Router } from "express"
import cors from "cors"
import routes from "./routes"
import {
  attachPacketier, authentication,
  errorHandler,
  logger,
} from "./middleware"
import { OnIt } from "common"


export default (): Application => {
  const server = Express()

  // Custom middleware
  server.use(attachPacketier)
  server.use(logger)

  // Setup external middleware
  server.use(Express.json({ strict: true }))
  server.use(
    cors({
      origin: [
        OnIt.productionUrl,
        process.env.NODE_ENV === "DEVELOPMENT" ? "localhost" : undefined,
      ],
    }),
  )

  // Setup docs path
  server.use("/docs", (_, res) => {
    res.redirect("https://app.swaggerhub.com/apis-docs/JonoAugustine/OnIt")
  })

  // setup API paths
  const api = Router()
  // Add routes
  api.use("/users", routes.users)
  api.use("/projects", authentication(), routes.projects)
  api.use("/tasks", authentication(), routes.tasks)
  api.use("/notes", authentication(), routes.notes)
  api.use("/admin", authentication(), routes.admin)
  server.use("/api", api)

  // Handle errors
  server.use(errorHandler)

  return server
}
