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
  .make(GET, "one", async (req, res) => {
    // Pull data
    const { uid } = req.token;
    /** Path UID */
    const { uid: pUid } = req.params;

    if (pUid !== uid) {
      return req
        .status(401)
        .json(packetier(false, null, { err: "Mismatch uid" }));
    }

    const { tid } = req.params;

    // Attempt to find
    let taskDoc;
    try {
      taskDoc = await Task.model.findOne({ uid, tid });
    } catch (error) {
      return res
        .status(500)
        .json(packetier(false, null, { err: "Internal 1" }));
    }

    // Reject 404s
    if (!taskDoc) {
      return res.status(404).json(
        packetier(false, null, {
          err: "Task not found",
          query: { ...req.params, uid }
        })
      );
    }

    const cleanTask = taskDoc.get();
    delete cleanTask.__v;
    delete cleanTask._id;

    return releaseEvents.json(
      packetier(true, { task: cleanTask }, { query: { ...req.params } })
    );
  })
  /**
   * GET /task/{uid}
   */
  .make(GET, "many", async (req, res) => {
    // Pull data
    const { uid } = req.token;
    const { uid: pUid } = req.params;
    let { limit, state } = req.query;

    if (uid !== pUid) {
      return req
        .status(401)
        .json(packetier(false, null, { err: "Mismatch uid" }));
    }

    // Build query
    const query = { limit: limit || 100, uid };

    if (state) query.state = state;

    // Query
    let taskDocs;
    try {
      taskDocs = await Task.model.find(query);
    } catch (error) {
      return res
        .status(500)
        .json(packetier(false, null, { err: "Internal 1" }));
    }

    if (!taskDocs) {
      return res
        .status(404)
        .json(packetier(false, null, { err: "Tasks not found" }));
    }

    return res.json(
      packetier(
        true,
        {
          tasks: taskDocs
            .map(t => t.get())
            .map(t => {
              let b = t;
              delete b.__v;
              delete b._id;
              return b;
            })
        },
        { query: { ...req.query, ...req.params } }
      )
    );
  })
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
