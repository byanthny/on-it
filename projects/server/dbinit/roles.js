const {
  Update,
  Collection,
  Role,
  Query,
  If,
  Exists,
  CreateRole,
  Lambda,
  Equals,
  CurrentIdentity,
  Var,
} = require("faunadb")
const NAMES = require("../src/dao/names.json")

const createOrUpdateRole = ({ name, membership, privileges }) => If(
  Exists(Role(name)),
  Update(Role(name), { name, membership, privileges }),
  CreateRole({ name, membership, privileges })
)

const logged_in_user = createOrUpdateRole({
  name: NAMES.ROLES.LOGGED_IN,
  membership: [{ resource: Collection(NAMES.COLLECTIONS.USERS) }],
  privileges: [
    {
      resource: Collection(NAMES.COLLECTIONS.USERS),
      actions: {
        read: Query(Lambda("userRef", Equals(CurrentIdentity(), Var("userRef")))),
      }
    }
  ]
})

module.exports = [
  logged_in_user
]