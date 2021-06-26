const { createOrUpdateIndex } = require("./util")
const NAMES = require("../../src/dao/names.json")
const { Collection } = require("faunadb")

module.exports = [
  createOrUpdateIndex({
    name: NAMES.INDEXES.LIMIT.ALL,
    source: Collection(NAMES.COLLECTIONS.LIMITS)
  }),
  createOrUpdateIndex({
    name: NAMES.INDEXES.LIMIT.UNIQUE_ROLE,
    source: Collection(NAMES.COLLECTIONS.LIMITS),
    unique: true,
    terms: [{ field: ["data", "role"] }]
  })
]