const scraperObject = {
  url: "https://www.standardbank.co.mz/",
  scrapperName: "standardBank",
  async executeScrapper(browser) {
    const standardBankPromise = new Promise(async (resolve, reject) => {
      try {
        let page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto(this.url).catch((err) => reject(err));
        await page.waitForSelector("div#currency").catch((err) => reject(err));
        let currencies = await page
          .$$eval(
            "div#currency > div.table-wrapper > div.table-responsive",
            (values) => {
              let currenciesArray = [];
              values = values
                .map((el) => el.querySelector("table > tbody"))
                .map((el) => el.innerText);
              let currencyStrings = values[0]
                .replaceAll("\t", "|")
                .replaceAll("\n", "|")
                .replaceAll("|", " | ")
                .replaceAll(" |  |  | ", "");
              currencyStrings = currencyStrings
                .split("|")
                .map((element) => element.trim());
              currencyStrings.forEach((word, index) => {
                const pattern = new RegExp("([A-Z]\\w+)");
                if (pattern.test(word)) {
                  const currency = {};
                  currency.currency = word;
                  currency.buy = parseFloat(currencyStrings[index + 1]);
                  currency.sell = parseFloat(currencyStrings[index + 2]);
                  currenciesArray.push(currency);
                }
              });
              return currenciesArray.sort((a, b) =>
                a.currency.localeCompare(b.currency)
              );
            }
          )
          .catch((err) => reject(err));
        const sanitizedObject = {
          bankName: "Standard Bank Moçambique",
          currencies,
        };
        return resolve(sanitizedObject);
      } catch (e) {
        console.log(e);
        return reject(e);
      }
    });
    return standardBankPromise;
  },
};
module.exports = scraperObject;
