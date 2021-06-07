const milleniumBim = require("./scrapers/milleniumBim");
const bancoUnico = require("./scrapers/bancoUnico");
const standardBank = require("./scrapers/standardBank");
const bci = require("./scrapers/bci");
const fnb = require("./scrapers/fnb");
const firstCapitalBank = require("./scrapers/firstCapitalBank");
const moza = require("./scrapers/mozaBanco");
const bancoMocambique = require("./scrapers/bancoMocambique");
const { updateDatabase } = require("./firebaseOperations");
const { dispatch } = require("./logger");
async function scrapeAll(browserInstance) {
  dispatch("Scrapping the Web for Currencies...");
  let browser;
  try {
    browser = await browserInstance;
    const banks = [
      milleniumBim,
      bancoUnico,
      standardBank,
      bci,
      fnb,
      firstCapitalBank,
    ];
    banks.forEach((bank) => {
      bank
        .executeScrapper(browser)
        .then((data) => {
          dispatch(`Scrapped Successfully: ${bank.scrapperName}`);
          updateDatabase(
            `/scrapperInformation/dailyInformation/${bank.scrapperName}`,
            {
              ...data,
              date: new Date().toLocaleString("en-GB"),
            }
          );
        })
        .catch((error) => {
          dispatch(`Failed to Scrappe: ${bank.scrapperName}`);
          updateDatabase(`/scrapperErrors/${bank.scrapperName}`, error);
        });
    });
  } catch (err) {
    dispatch(`Could not resolve the browser instance => ${err}`);
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);
