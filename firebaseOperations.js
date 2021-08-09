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
  getFirebaseInstance: () => {
    return firebase.database();
  },
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
  getCurrenciesData() {
    const database = firebase.database();
    let currencies = {};
    return new Promise(async (resolve, reject) => {
      await database
        .ref("/scrapperInformation/dailyInformation")
        .orderByValue()
        .once("value", async (data) => {
          currencies = await data.val();
          return resolve(currencies);
        });
    });
  },
  getSelectedData(bankName) {
    const database = firebase.database();
    let currencies = {};
    return new Promise(async (resolve, reject) => {
      await database
        .ref(`/scrapperInformation/dailyInformation/${bankName}`)
        .orderByValue()
        .once("value", async (data) => {
          currencies = await data.val();
          return resolve(currencies);
        });
    });
  },
};
