import Express, { Application, Router } from "express"
import MongoStore from "connect-mongo"
import session from "express-session"
import { OnIt, UserRole } from "common"
import { attachPacketier, authentication, errorHandler, callLogger } from "./middleware"
import db from "./db"
import cors from "cors"
import routes from "./routes"
import logger from "winston"

async function setupMongo() {
  const mongo = await db.client.connect()
  await db.users.init()
  await db.tasks.init()
  await db.limits.init()
  return mongo
}

export default async (): Promise<Application> => {
  logger.info("connecting mongo client")
  const mongoClient = await setupMongo()

  logger.info("express setup")
  const server = Express()

  // Custom middleware
  server.use(attachPacketier)
  server.use(callLogger)

  // Setup external middleware
  server.use(Express.json({ strict: true }))
  const corsOrigin = [
    OnIt.productionUrl,
    process.env.NODE_ENV === "DEVELOPMENT" ? "localhost" : undefined,
  ]
  logger.info("cors origins set", { corsOrigin })
  server.use(cors({ origin: corsOrigin }))

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
    name: "onit.app.session",
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
