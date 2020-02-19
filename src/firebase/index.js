const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://on-it-app.firebaseio.com"
});

module.exports = admin.auth();
