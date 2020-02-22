const {
  Controller,
  Methods: { GET, PUT, POST, DELETE }
} = require("subtroller");
const { packetier } = require("packetier");
const { Task } = require("../models");

/**
 * Controller for Task routes.
 *
 * @since 0.1.0
 * @author Jonathan Augustine
 */
const controller = new Controller()
  .make(GET, "one", async (req, res) => {})
  .make(GET, "many", async (req, res) => {})
  .make(POST, "one", async (req, res) => {
    // Validate incoming body
    const { value, error, errors } = Task.schema.validate({
      ...req.body,
      uid: req.token.uid
    });

    // Reject malformed tasks
    if (error) {
      return res
        .status(400)
        .json(packetier(false, null, { err: error.message }));
    }

    // Save Task to DB
    let saveResult;
    try {
      saveResult = await Task.model.create(value);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json(packetier(false, null, { err: "Internal 1" }));
    }

    const _clean = saveResult;

    delete _clean._id;

    return res
      .status(201)
      .json(packetier(true, { task: _clean }, { createdAt: _clean.createdAt }));
  })
  .make(PUT, "one", async (req, res) => {})
  .make(DELETE, "one", async (req, res) => {});

module.exports = controller;
