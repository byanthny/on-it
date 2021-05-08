const { packetier } = require("packetier");

/**
 * Ensures that the token UID and path UID match.
 *
 * @param {*} req
 * @param {*} res
 * @param {function} next
 */
const requireMatchingUids = async (req, res, next) => {
  if (req.token.uid !== req.params.uid) {
    return res
      .status(401)
      .json(packetier(false, null, { err: "Mismatch uid" }));
  }
  next();
};

module.exports = { requireMatchingUids };
