import { Client } from "faunadb"

export default new Client({ secret: process.env.FAUNA_SERVER_KEY })
