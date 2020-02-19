const { Controller } = require("subtroller");
const { packetier } = require("packetier");
const { User } = require("../models");

/**
 * Controller for User routes.
 *
 * @since 0.1.0
 * @author Jonathan Augustine
 */
const controller = new Controller()
  .make("get", "one", async (req, res) => {
    console.log(req.token);
    res.json({});
  })
  .make("post", "one", async (req, res) => {
    res.json(req.token);
  })
  .make("put", "one", async (req, res) => {});

module.exports = controller;
