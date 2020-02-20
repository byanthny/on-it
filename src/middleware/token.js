const firebase = require("../firebase");
const { packetier } = require("packetier");

class Token {
  constructor({ uid, email }, raw) {
    this.uid = uid;
    this.email = email;
    this.raw = raw;
  }
}

/**
 * Attempts to extract the Firebase Auth token from the request header
 * and add the data to the req object as "token"
 *
 * @param {*} req
 * @param {*} res
 * @param {function} next
 */
const pullToken = async (req, res, next) => {
  const _token = req.header.token;

  if (!_token) {
    return next();
  }

  let decoded;
  try {
    decoded = await firebase.verifyIdToken(_token, true);
  } catch (error) {
    return next();
  }

  if (decoded) {
    req.token = new Token(decoded, _token);
  }

  next();
};

/**
 * Require an auth token, send 401 if no token is found.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const requireToken = (req, res, next) => {
  if (!req.token) {
    return res
      .status(401)
      .json(packetier(false, null, { err: "Invalid or missing token" }));
  } else next();
};

module.exports = { pullToken, requireToken };
