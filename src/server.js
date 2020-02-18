const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const Server = async () => {
  const svr = express();

  svr.use(cors());
  svr.use(express.json());

  // API docs
  svr.use("/api/docs", routes.docs);

  // API routes
  svr.use("/api/user", routes.user);

  return svr;
};

module.exports = Server;
