const {
  Controller,
  Methods: { DELETE, GET }
} = require("subtroller");
const { packetier } = require("packetier");
const FirebaseAuth = require("../firebase");
const { User } = require("../models");

/**
 * Controller for User routes.
 *
 * @since 0.1.0
 * @author Jonathan Augustine
 */
const controller = new Controller()
  .make(GET, "one", async (req, res) => {
    // get user
    let userDoc;
    try {
      userDoc = await User.model.findOne({ uid: req.token.uid });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(packetier(false, null, { err: "Internal 1" }));
    }

    if (!userDoc) {
      try {
        userDoc = await User.model.create(
          await User.schema.validateAsync({ uid: req.token.uid })
        );
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json(packetier(false, null, { err: "Internal 2" }));
      }
    }

    res.json(packetier(true, { user: userDoc }));
  })
  .make(DELETE, "one", async (req, res) => {
    // pull data
    const { uid } = req.token;

    try {
      await FirebaseAuth.deleteUser(uid);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json(packetier(false, null, { err: "Internal 1" }));
    }

    return res
      .status(200)
      .json(packetier(true, null, { msg: `User ${uid} Deleted` }));
  });

module.exports = controller;
