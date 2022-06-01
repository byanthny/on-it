import Express, { Application, Router } from "express"
import session from "express-session"
import db from "./db"
import MongoStore from "connect-mongo"
import cors from "cors"
import routes from "./routes"
import { attachPacketier, authentication, errorHandler, logger } from "./middleware"
import { OnIt, UserRole } from "common"

async function setupMongo() {
  const mongo = await db.client.connect()
  await db.users.init()
  await db.tasks.init()
  await db.limits.init()
  return mongo
}

export default async (): Promise<Application> => {
  const mongoClient = await setupMongo()

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
  api.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    unset: "destroy",
    cookie: {
      secure: process.env.STAGE !== "DEVELOPMENT",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: MongoStore.create({
      client: mongoClient,
      crypto: { secret: process.env.SESSION_SECRET },
    }),
  }))
  api.use("/users", /* auth handled in router */routes.users)
  api.use("/tags", authentication(), routes.tags)
  api.use("/tasks", authentication(), routes.tasks)
  api.use("/admin", authentication([UserRole.ADMIN, UserRole.DEVELOPER]), routes.admin)
  server.use("/api", api)

  // Handle errors
  server.use(errorHandler)

  return server
}
