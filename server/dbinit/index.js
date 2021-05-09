require("dotenv").config()
const { Client } = require("faunadb")
const collections = require("./collections")
const indexes = require("./indexes")
const roles = require("./roles")

const c = new Client({ secret: process.env.FAUNA_ADMIN_KEY })

const main = async () => {
  // await functions(c)
  return c.query([
    ...collections,
    ...indexes,
    ...roles,
  ])
}

console.log("........DB INIT........")
main()
  .then((a) => {
    console.log(a)
    console.log("........COMPLETE........")
  })
  .catch(e => {
    console.log("xxxxxx INIT FAILED xxxxxx")
    console.log(JSON.stringify(JSON.parse(e.requestResult.responseRaw), null, 2))
    console.log("xxxxxx INIT FAILED xxxxxx")
  })
  .finally(() => process.exit())