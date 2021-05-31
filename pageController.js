const milleniumBim = require("./scrapers/milleniumBim");
const bancoUnico = require("./scrapers/bancoUnico");
const standardBank = require("./scrapers/standardBank");
const bci = require("./scrapers/bci");
const fnb = require("./scrapers/fnb");
const firstCapitalBank = require("./scrapers/firstCapitalBank");
const moza = require("./scrapers/mozaBanco");
const bancoMocambique = require("./scrapers/bancoMocambique");
async function scrapeAll(browserInstance) {
  let browser;
  try {
    browser = await browserInstance;
    const scrappers = [];
    scrappers.push(bci.executeScrapper(browser));
    scrappers.push(milleniumBim.executeScrapper(browser));
    scrappers.push(bancoUnico.executeScrapper(browser));
    scrappers.push(standardBank.executeScrapper(browser));
    scrappers.push(fnb.executeScrapper(browser));
    scrappers.push(firstCapitalBank.executeScrapper(browser));
    scrappers.push(moza.executeScrapper(browser));
    scrappers.push(bancoMocambique.executeScrapper(browser));
    Promise.all(scrappers).then((data) => {
      Object.values(data).forEach((obj) => {
        console.log(obj);
      });
    });
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);
