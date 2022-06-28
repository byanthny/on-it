import Env from "../types/env"

export default {
  dbs: {
    auth: {
      name: "auth" + (Env.isDev ? "DEV" : ""),
      collections: {
        sessions: "sessions",
      },
    },
    app: {
      name: "application" + (Env.isDev ? "DEV" : ""),
      collections: {
        users: "users",
        tasks: "tasks",
        limits: "limits",
        tags: "tags",
        notes: "notes",
      },
    },
  },
}
