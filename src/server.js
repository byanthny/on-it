const express = require("express");
const routes = require("./routes");

const Server = async () => {
  const svr = express();

  // API docs
  svr.use("/api/docs", routes.docs);

  return svr;
};

module.exports = Server;
