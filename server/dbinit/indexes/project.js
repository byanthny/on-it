const { createOrUpdateIndex } = require("./util")
const { INDEXES, COLLECTIONS } = require("../../src/dao/names.json")
const { Collection } = require("faunadb")

module.exports = [
  createOrUpdateIndex({
    name: INDEXES.PROJECT.ALL,
    source: Collection(COLLECTIONS.PROJECTS)
  }),
  createOrUpdateIndex({
    name: INDEXES.PROJECT.USER_ID,
    source: Collection(COLLECTIONS.PROJECTS),
    terms: [{ field: ["data", "uid"] }]
  }),
  createOrUpdateIndex({
    name: INDEXES.PROJECT.NAME,
    source: Collection(COLLECTIONS.PROJECTS),
    terms: [{ field: ["data", "name"] }]
  }),
  createOrUpdateIndex({
    name: INDEXES.PROJECT.UNIQUE_NAME_AND_USER,
    source: Collection(COLLECTIONS.PROJECTS),
    unique: true,
    terms: [
      { field: ["data", "name"] },
      { field: ["data", "uid"] }
    ]
  })
]