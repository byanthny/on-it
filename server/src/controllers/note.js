const {
  Controller,
  Methods: { GET, POST, PUT, DELETE }
} = require("subtroller");
const { packetier } = require("packetier");
const { Note } = require("../models");

/**
 * Controller for Note routes.
 *
 * @since 0.1.0
 * @author Jonathan Augustine
 */
const controller = new Controller()
  .make(GET, "one", async (req, res) => {})
  .make(GET, "many", async (req, res) => {})
  .make(POST, "one", async (req, res) => {})
  .make(PUT, "one", async (req, res) => {})
  .make(DELETE, "one", async (req, res) => {});

module.exports = controller;
