export default {
  dbs: {
    auth: {
      name: "auth",
      collections: {
        sessions: "sessions",
      },
    },
    app: {
      name: "application",
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
