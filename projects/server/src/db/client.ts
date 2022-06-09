import { MongoClient } from "mongodb"
import names from "./names"


const mongo = new MongoClient(process.env.MONGO_URI)
const app = mongo.db(names.dbs.app.name)
const auth = mongo.db(names.dbs.auth.name)

const connect = () => mongo.connect()
const close = () => mongo.close()

export default { connect, close, app, auth }