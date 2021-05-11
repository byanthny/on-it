import Express, { Application, Router } from "express"
import cors from "cors"
import routes from "./routes"
import { attachPacketier, errorHandler } from "./middleware"

export default (): Application => {
  const server = Express()

  // Setup external middleware
  server.use(Express.json())
  server.use(cors())

  // Setup docs path
  server.use("/docs", (_, res) => {
    res.redirect("https://app.swaggerhub.com/apis-docs/JonoAugustine/OnIt")
  })

  // setup API paths
  const api = Router()
  // Setup middleware
  api.use(attachPacketier)
  // Add routes
  api.use("/users", routes.users)
  // TODO api.use("/tasks", routes.tasks)
  // TODO api.use("/notes", routes.notes)
  // TODO api.use("/projects", routes.projects)
  server.use("/api", api)

  // Handle errors
  server.use(errorHandler)

  return server
}
