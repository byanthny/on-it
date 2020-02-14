const Server = require("./server");

const main = async () => {
  const server = await Server();

  server.listen(process.env.PORT || 7000, () =>
    console.log(`Listening on port ${process.env.PORT || 7000}`)
  );
};

main();
