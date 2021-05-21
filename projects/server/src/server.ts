import Express, { Application, Router } from "express"
import cors from "cors"
import routes from "./routes"
import {
  attachPacketier,
  errorHandler,
  readToken,
  requireUser,
} from "./middleware"

export default (): Application => {
  const server = Express()

  // Custom middleware
  server.use(attachPacketier)

  // Setup external middleware
  server.use(Express.json({ strict: true }))
  server.use(cors())

  // Setup docs path
  server.use("/docs", (_, res) => {
    res.redirect("https://app.swaggerhub.com/apis-docs/JonoAugustine/OnIt")
  })

  // setup API paths
  const api = Router()
  // Setup middleware
  api.use(readToken)
  // Add routes
  api.use("/users", routes.users)
  api.use("/projects", requireUser, routes.projects)
  api.use("/tasks", requireUser, routes.tasks)
  api.use("/notes", requireUser, routes.notes)
  server.use("/api", api)

  // Handle errors
  server.use(errorHandler)

  return server
}
