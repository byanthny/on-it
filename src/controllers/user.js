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
  .make("get", "user", async (req, res) => {})
  .make("post", "create", async (req, res) => {})
  .make("put", "update", async (req, res) => {});

module.exports = controller;
