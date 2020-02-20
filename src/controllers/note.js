const { Controller } = require("subtroller");
const { packetier } = require("packetier");
const { Note } = require("../models");

/**
 * Controller for Note routes.
 *
 * @since 0.1.0
 * @author Jonathan Augustine
 */
const controller = new Controller()
  .make("get", "one", async (req, res) => {})
  .make("get", "many", async (req, res) => {})
  .make("post", "one", async (req, res) => {})
  .make("put", "one", async (req, res) => {});

module.exports = controller;
