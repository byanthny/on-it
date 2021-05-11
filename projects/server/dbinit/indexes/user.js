const { createOrUpdateIndex } = require("./util")
const NAMES = require("../../src/dao/names.json")
const { Collection } = require("faunadb")

module.exports = [
  createOrUpdateIndex({
    name: NAMES.INDEXES.USER.ALL,
    source: Collection(NAMES.COLLECTIONS.USERS)
  }),
  createOrUpdateIndex({
    name: NAMES.INDEXES.USER.UNIQUE_EMAIL,
    source: Collection(NAMES.COLLECTIONS.USERS),
    unique: true,
    terms: [{ field: ["data", "email"] }]
  }),
  createOrUpdateIndex({
    name: NAMES.INDEXES.USER.NAME_FIRST,
    source: Collection(NAMES.COLLECTIONS.USERS),
    unique: true,
    terms: [{ field: ["data", "name", "first"] }]
  }),
  createOrUpdateIndex({
    name: NAMES.INDEXES.USER.NAME_LAST,
    source: Collection(NAMES.COLLECTIONS.USERS),
    unique: true,
    terms: [{ field: ["data", "name", "last"] }]
  }),
  createOrUpdateIndex({
    name: NAMES.INDEXES.USER.UNIQUE_NAME_DISPLAY,
    source: Collection(NAMES.COLLECTIONS.USERS),
    unique: true,
    terms: [{ field: ["data", "name", "display"] }]
  })
]