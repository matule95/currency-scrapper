require("dotenv").config();
const logger = require("./logger");
logger.dispatch("Initializing Currency Scrapper");
const browserObject = require("./browser");
const scraperController = require("./pageController");
let browserInstance = browserObject.startBrowser();
module.exports = {
  // initializeScrapper: () =>
  //   setInterval(() => scraperController(browserInstance), 60000),
  initializeScrapper: () => {
    const allowedHours = ["8:00", "10:00", "12:00", "16:00", "20:00"];
    setInterval(() => {
      const currentDate = new Date();
      const getCurrentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
      if (allowedHours.includes(getCurrentTime))
        scraperController(browserInstance);
    }, 60000);
  },
};
