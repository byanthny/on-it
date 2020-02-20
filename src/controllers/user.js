const { Controller } = require("subtroller");
const { packetier } = require("packetier");
const FirebaseAuth = require("../firebase");

/**
 * Controller for User routes.
 *
 * @since 0.1.0
 * @author Jonathan Augustine
 */
const controller = new Controller().make("delete", "one", async (req, res) => {
  let decoded;
  try {
    decoded = await FirebaseAuth.verifyIdToken(req.token.raw);
  } catch (error) {
    console.error(error);
    return res.status(500).json(packetier(false, null, { err: "Internal 1" }));
  }

  try {
    await FirebaseAuth.deleteUser(decoded.uid);
  } catch (error) {
    console.error(error);
    return res.status(500).json(packetier(false, null, { err: "Internal 2" }));
  }

  return res
    .status(200)
    .json(packetier(true, null, { msg: `User ${decoded.uid} Deleted` }));
});

module.exports = controller;
