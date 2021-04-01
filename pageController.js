const milleniumBim = require('./scrapers/milleniumBim');
async function scrapeAll(browserInstance){
    let browser;
    try{
        browser = await browserInstance;
        await milleniumBim.executeScrapper(browser).then((payload) => {
            console.log('hello')
            console.log(payload)
        })

    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)