const {
  If,
  Exists,
  Update,
  CreateIndex,
  Index
} = require("faunadb")

/**
 * 
 * @param {Object} i 
 * @param {string} i.name
 * @param {Array<string | Object>} i.terms - Search terms
 * @param {Array<string | Object>} i.values - Return values
 * @returns 
 */
const createOrUpdateIndex = ({ name, ...data }) => If(
  Exists(Index(name)),
  Update(Index(name), { name, ...data }),
  CreateIndex({ name, ...data })
)

module.exports = { createOrUpdateIndex }