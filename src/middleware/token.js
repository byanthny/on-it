

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
 * @param {*} req
 * @param {*} res
 * @param {function} next
 */
const pullToken = (req, res, next) => {};

module.exports = {};
