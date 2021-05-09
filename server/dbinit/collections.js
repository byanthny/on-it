const {
  If,
  Exists,
  Collection,
  Replace,
  CreateCollection
} = require("faunadb")
const { COLLECTIONS } = require("../src/dao/names.json")

const createOrReplaceCollection = ({ name }) => If(
  Exists(Collection(name)),
  Replace(Collection(name), { name }),
  CreateCollection({ name })
)

module.exports = [
  createOrReplaceCollection({ name: COLLECTIONS.USERS }),
  createOrReplaceCollection({ name: COLLECTIONS.TASKS }),
  createOrReplaceCollection({ name: COLLECTIONS.NOTES }),
  createOrReplaceCollection({ name: COLLECTIONS.PROJECTS }),
]