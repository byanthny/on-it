const {
  Controller,
  Methods: { GET, POST, PUT, DELETE }
} = require("subtroller");
const { packetier } = require("packetier");
const { User, Project } = require("../models");

// TODO GET, DELETE, PUT
const controller = new Controller().make(POST, "one", async (req, res) => {
  // Validate
  let project;
  try {
    project = await Project.schema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json(packetier(false, null, { err: error.message }));
  }

  // Get user
  let userDoc;
  try {
    userDoc = await User.model.findOne({ uid: req.token.uid });
  } catch (error) {
    return res.status(500).json(packetier(false, null, { err: "Internal 1" }));
  }

  if (!userDoc) {
    return res
      .status(404)
      .json(
        packetier(false, null, { err: "User not found", uid: req.token.uid })
      );
  }

  if (userDoc.projects.some(p => p.name.toLowerCase() == project.name)) {
    return res
      .status(409)
      .json(packetier(false, null, { err: "Duplicate Name" }));
  }

  userDoc.projects.push(project);

  // Save
  try {
    await userDoc.save();
  } catch (error) {
    return res.status(500).json(packetier(false, null, { err: "Internal 2" }));
  }

  res.json(packetier(true, { project }, { user: userDoc }));
});

module.exports = controller;
