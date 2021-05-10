const { createOrUpdateIndex } = require("./util")
const { INDEXES, COLLECTIONS } = require("../../src/dao/names.json")
const { Collection } = require("faunadb")

module.exports = [
  createOrUpdateIndex({
    name: INDEXES.NOTE.ALL,
    source: Collection(COLLECTIONS.NOTES)
  }),
  createOrUpdateIndex({
    name: INDEXES.NOTE.USER_ID,
    source: Collection(COLLECTIONS.NOTES),
    terms: [{ field: ["data", "uid"] }]
  }),
  createOrUpdateIndex({
    name: INDEXES.NOTE.PARENT_ID,
    source: Collection(COLLECTIONS.NOTES),
    terms: [{ field: ["data", "parent"] }]
  }),
  createOrUpdateIndex({
    name: INDEXES.NOTE.TAG_ID,
    source: Collection(COLLECTIONS.NOTES),
    terms: [{ field: ["data", "tags"] }]
  }),
]