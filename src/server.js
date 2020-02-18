const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const { join } = require("path");

const Server = async () => {
  const svr = express();

  svr.use(cors());
  svr.use(express.json());

  // Static files
  svr.use(express.static(join(__dirname, "..", "site", "dist")));

  // API docs
  svr.use("/api/docs", routes.docs);

  // API routes
  svr.use("/api/user", routes.user);

  return svr;
};

module.exports = Server;
