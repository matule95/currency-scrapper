const scraperObject = {
  url: "https://www.standardbank.co.mz/",
  scrapperName: "standardBank",
  async executeScrapper(browser) {
    const unicoPromise = new Promise(async (resolve, reject) => {
      let page = await browser.newPage();
      await page.goto(this.url).catch((err) => reject(err));
      await page
        .waitForSelector("#currency-design")
        .catch((err) => reject(err));
      let currencies = await page
        .$$eval("div#currency-design", (values) => {
          let currenciesArray = [];
          values = values
            .map((el) => el.querySelector("table > tbody"))
            .map((el) => el.innerText);
          console.log(values[0]);
          let currencyStrings = values[0]
            .replaceAll("\t", "|")
            .replaceAll("\n", "|")
            .replaceAll("|", " | ")
            .replaceAll("Moeda |  |  | Compra |  |  | Venda |  | ", "");
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
        })
        .catch((err) => reject(err));
      const sanitizedObject = {
        bankName: "Standard Bank Moçambique",
        currencies,
      };
      return resolve(sanitizedObject);
    }).catch((error) => reject(error));
    return unicoPromise;
  },
};
module.exports = scraperObject;
