let firebase = require("firebase/app");
const logger = require("./logger");
require("firebase/database");
const {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  databaseURL,
} = process.env;
firebase.initializeApp({
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  databaseURL,
});
module.exports = {
  updateDatabase: (path, data) => {
    const database = firebase.database();
    database.ref(path).push(data, (error) => {
      if (error) {
        logger.dispatch("Failed Updating Database");
      } else {
        logger.dispatch("Database Updated");
      }
    });
  },
};
