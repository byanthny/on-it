const {
  Controller,
  Methods: { GET, POST, PUT, DELETE }
} = require("subtroller");
const { packetier } = require("packetier");
const { User, Project } = require("../models");

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

    const limit = Math.max(255, req.body.limit) || 100;

    res.json(
      packetier(
        true,
        {
          projects: userDoc.projects.sort(
            ({ date: d1 }, { date: d2 }) => d1 - d2
          )
        },
        { count: userDoc.projects.length, query: { uid: req.token.uid, limit } }
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
  })
  /** PUT /projects/uid/pname */
  .make(PUT, "one", async (req, res) => {
    // Get user
    let userDoc;
    try {
      userDoc = await User.model.findOne({ uid: req.token.uid });
    } catch (error) {
      return res
        .status(500)
        .json(packetier(false, null, { err: "Internal 1" }));
    }

    const [project] = userDoc.projects.filter(
      ({ name }) => name === req.params.pname
    );

    if (!project) {
      return res.status(404).json(
        packetier(false, null, {
          err: `No project found with name ${req.params.pname}`
        })
      );
    }

    const { name, color } = req.body;

    // Reject duplicate name
    if (
      userDoc.projects.some(p => p.name.toLowerCase() == name.toLowerCase())
    ) {
      return res
        .status(409)
        .json(packetier(false, null, { err: "Duplicate Name" }));
    }

    const old = { ...project };

    if (name) {
      project.name = name;
    }

    if (color) {
      project.color = color;
    }

    try {
      await userDoc.save();
    } catch (error) {
      return res
        .status(400)
        .json(packetier(false, null, { err: "Failed to update project" }));
    }

    return res.json(packetier(true, { project }, { old }));
  });

module.exports = controller;
