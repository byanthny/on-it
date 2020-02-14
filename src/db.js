const mongoose = require("mongoose");

const connect = async () => {
  try {
    const {
      connection: {
        host,
        db: { databaseName }
      }
    } = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true
    });

    console.log(`MONGO: ${databaseName} @ ${host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = { connect };
