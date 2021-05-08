// Load env
require("dotenv").config();
//

const Server = require("./server");
const db = require("./db");

const main = async () => {
  await db.connect();

  const server = await Server();

  server.listen(process.env.PORT || 7000, () =>
    console.log(`Listening http://127.0.0.1:${process.env.PORT || 7000}`)
  );
};

main();
