const { join } = require("path");
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const {
  token: { pullToken }
} = require("./middleware");

const Server = async () => {
  const svr = express();

  svr.use(cors());
  svr.use(express.json());

  // Static files
  svr.use(express.static(join(__dirname, "..", "site", "dist")));

  // API docs
  svr.use("/api", pullToken);
  svr.use("/api/docs", routes.docs);

  // API routes
  svr.use("/api/users", routes.user);
  svr.use("/api/projects", routes.projects);
  svr.use("/api/tasks", routes.tasks);
  svr.use("/api/notes", routes.notes);

  return svr;
};

module.exports = Server;
