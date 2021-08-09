require("dotenv").config();
const logger = require("./logger");
logger.dispatch("Initializing Currency Scrapper");
const browserObject = require("./browser");
const scraperController = require("./pageController");
let browserInstance = browserObject.startBrowser();
module.exports = {
  // initializeScrapper: () =>
  //   setInterval(() => scraperController(browserInstance), 60000),
  initializeScrapper: () => scraperController(browserInstance),
};
