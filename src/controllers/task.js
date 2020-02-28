const {
  Controller,
  Methods: { GET, PUT, POST, DELETE }
} = require("subtroller");
const { packetier } = require("packetier");
const { Task } = require("../models");
const joi = require("@hapi/joi");

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

    const cleanTask = taskDoc;
    delete cleanTask.__v;
    delete cleanTask._id;

    return res.json(
      packetier(true, { task: cleanTask }, { query: { ...req.params } })
    );
  })
  /**
   * GET /tasks/{uid}
   */
  .make(GET, "many", async (req, res) => {
    // Pull data
    const { uid } = req.token;
    const { uid: pUid } = req.params;
    let { limit, state } = req.query;

    limit = parseInt(limit);
    limit = limit && limit > 1 && limit < 350 ? limit : 100;

    if (uid !== pUid) {
      return req
        .status(401)
        .json(packetier(false, null, { err: "Mismatch uid" }));
    }

    // Build query
    const query = { uid };

    if (state) query.state = state;

    // Query
    let taskDocs;
    try {
      taskDocs = await Task.model
        .find(query)
        .limit(limit)
        .sort({ due: -1 });
    } catch (error) {
      console.log(error);
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
          tasks: taskDocs.map(t => {
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
  .make(PUT, "one", async (req, res) => {
    // Pull data
    const { uid } = req.token;
    const { uid: pUid, tid } = req.params;

    // auth stage
    if (uid !== pUid) {
      return res
        .status(401)
        .json(packetier(false, null, { err: "Mismatch uid" }));
    }

    // validate body
    try {
      Task.schema.validateAsync({ ...req.body, uid });
    } catch (error) {
      return res
        .status(400)
        .json(packetier(false, null, { err: error.message }));
    }

    // Update
    let result;
    try {
      result = await Task.model.updateOne({ uid, tid }, req.body);
    } catch (error) {
      return res
        .status(500)
        .json(packetier(false, null, { err: "Internal 1" }));
    }

    console.log(result);

    res.json(
      packetier(
        true,
        { task: "TOOD" },
        { query: { update: { ...req.body }, uid, tid } }
      )
    );
  })
  .make(DELETE, "one", async (req, res) => {
    // TODO
  });

module.exports = controller;
