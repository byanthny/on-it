const {
  Controller,
  Methods: { GET, POST, PUT, DELETE }
} = require("subtroller");
const { packetier } = require("packetier");
const { User, Project } = require("../models");

// TODO GET, DELETE, PUT
const controller = new Controller()
  .make(GET, "many", async (req, res) => {
    // Get user
    let userDoc;
    try {
      userDoc = await User.model.findOne({ uid: req.token.uid });
    } catch (error) {
      return res
        .status(500)
        .json(packetier(false, null, { err: "Internal 1" }));
    }

    res.json(
      packetier(
        true,
        { projects: userDoc.projects },
        { count: userDoc.projects.length, query: { uid: req.token.uid } }
      )
    );
  })
  .make(POST, "one", async (req, res) => {
    // Validate
    let project;
    try {
      project = await Project.schema.validateAsync(req.body);
    } catch (error) {
      return res
        .status(400)
        .json(packetier(false, null, { err: error.message }));
    }

    // Get user
    let userDoc;
    try {
      userDoc = await User.model.findOne({ uid: req.token.uid });
    } catch (error) {
      return res
        .status(500)
        .json(packetier(false, null, { err: "Internal 1" }));
    }

    if (!userDoc) {
      return res
        .status(404)
        .json(
          packetier(false, null, { err: "User not found", uid: req.token.uid })
        );
    }

    // Reject duplicate name
    if (
      userDoc.projects.some(
        p => p.name.toLowerCase() == project.name.toLowerCase()
      )
    ) {
      return res
        .status(409)
        .json(packetier(false, null, { err: "Duplicate Name" }));
    }

    userDoc.projects.push(project);

    // Save
    try {
      await userDoc.save();
    } catch (error) {
      return res
        .status(500)
        .json(packetier(false, null, { err: "Internal 2" }));
    }

    res.json(packetier(true, { project }, { user: userDoc }));
  })

  /** DELETE /projects/uid/pname */
  .make(DELETE, "one", async (req, res) => {
    // Get user doc
    let userDoc;
    try {
      userDoc = await User.model.findOne({ uid: req.token.uid });
    } catch (error) {
      return res
        .status(500)
        .json(packetier(false, null, { err: "Internal 1" }));
    }

    if (!userDoc) {
      return res
        .status(404)
        .json(packetier(false, null, { err: "User not found" }));
    }

    // find project
    let project = userDoc.projects.filter(
      ({ name }) => name === req.params.pname
    );

    if (project.length === 0) {
      return res
        .status(404)
        .json(packetier(false, null, { err: "Project not found" }));
    }

    const deletedProject = project[0];

    // Remove project
    userDoc.projects = userDoc.projects.filter(
      ({ name }) => name !== req.params.pname
    );

    // Update
    try {
      await userDoc.save();
    } catch (error) {
      return res
        .status(500)
        .json(packetier(false, null, { err: "Internal 2" }));
    }

    res.json(packetier(true, { deleted: true, project: deletedProject }));
  });

module.exports = controller;
