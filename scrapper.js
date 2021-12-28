require("dotenv").config();
const cronJob = require("node-cron");
const logger = require("./logger");
logger.dispatch("Initializing Currency Scrapper");
const browserObject = require("./browser");
const scraperController = require("./pageController");
let browserInstance = browserObject.startBrowser();
module.exports = {
  // initializeScrapper: () => scraperController(browserInstance),
  initializeScrapper: () => {
    cronJob.schedule("* * * * *", function () {
      scraperController(browserInstance);
    });
  },
};
