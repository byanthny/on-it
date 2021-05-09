const { createOrUpdateIndex } = require("./util")
const { INDEXES, COLLECTIONS } = require("../../src/dao/names.json")
const { Collection } = require("faunadb")

module.exports = [
  createOrUpdateIndex({
    name: INDEXES.TASK.ALL,
    source: Collection(COLLECTIONS.TASKS)
  }),
  createOrUpdateIndex({
    name: INDEXES.TASK.USER_ID,
    source: Collection(COLLECTIONS.TASKS),
    terms: [{ field: ["data", "uid"] }]
  }),
  createOrUpdateIndex({
    name: INDEXES.TASK.PARENT_ID,
    source: Collection(COLLECTIONS.TASKS),
    terms: [{ field: ["data", "parent"] }]
  }),
  createOrUpdateIndex({
    name: INDEXES.TASK.STATE,
    source: Collection(COLLECTIONS.TASKS),
    terms: [{ field: ["data", "state"] }]
  }),
  createOrUpdateIndex({
    name: INDEXES.TASK.TAG_ID,
    source: Collection(COLLECTIONS.TASKS),
    terms: [{ field: ["data", "tags"] }]
  }),
]