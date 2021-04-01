const milleniumBim = require('./scrapers/milleniumBim');
const bancoUnico = require('./scrapers/bancoUnico')
const standardBank = require('./scrapers/standardBank')
async function scrapeAll(browserInstance){
    let browser;
    try{
        browser = await browserInstance;
        milleniumBim.executeScrapper(browser).then((payload) => {
            console.log(payload)
        })
        bancoUnico.executeScrapper(browser).then((payload) => {
            console.log(payload)
        })
        standardBank.executeScrapper(browser).then((payload) => {
            console.log(payload)
        })
    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)