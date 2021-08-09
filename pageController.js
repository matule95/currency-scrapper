const milleniumBim = require("./scrapers/milleniumBim");
const nedbank = require("./scrapers/nedbank");
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
      nedbank,
      standardBank,
      bci,
      fnb,
      firstCapitalBank,
      moza,
      bancoMocambique,
    ];
    banks.forEach((bank) => {
      bank
        .executeScrapper(browser)
        .then((data) => {
          dispatch(`Scrapped Successfully: ${bank.scrapperName}`);
          console.log(data);
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
          console.log(error);
          // updateDatabase(`/scrapperErrors/${bank.scrapperName}`, { error });
        });
    });
  } catch (err) {
    dispatch(`Could not resolve the browser instance => ${err}`);
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);
