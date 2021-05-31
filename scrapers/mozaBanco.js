const scraperObject = {
  url: "https://www.mozabanco.co.mz/pt/particulares",
  async executeScrapper(browser) {
    const mozaPromise = new Promise(async (resolve, reject) => {
      let page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      await page.goto(this.url).catch((err) => reject(err));
      await page.waitForSelector("div.graph-container").then(async () => {
        let currencies = await page.$$eval("div.graph-container", (values) => {
          let htmlElements = [];
          values.forEach((value) => {
            htmlElements
              .push(value.innerText)
              .toString()
              .replaceAll("  ", "")
              .replaceAll("\n", "");
          });
          const splitString = htmlElements.toString().split("\n").slice(-9);
          const currenciesArray = [];
          splitString.forEach((word, index) => {
            const pattern = new RegExp("([A-Z])+[A-Z]");
            if (pattern.test(word)) {
              const currency = {};
              currency.currency = word;
              currency.buy = parseFloat(
                splitString[index + 1].replace(/,/, ".")
              );
              currency.sell = parseFloat(
                splitString[index + 2].replace(/,/, ".")
              );
              currenciesArray.push(currency);
            }
          });
          return {
            bankName: "Mozabanco",
            currencies: currenciesArray,
          };
        });
        return resolve(currencies);
      });
    });
    return mozaPromise;
  },
};
module.exports = scraperObject;
