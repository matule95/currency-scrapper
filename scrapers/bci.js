const scraperObject = {
  url: "https://www.bci.co.mz/",
  async executeScrapper(browser) {
    const unicoPromise = new Promise(async (resolve, reject) => {
      let page = await browser.newPage();
      await page.goto(this.url).catch((err) => reject(err));
      await page
        .waitForSelector(".main-content")
        .then(async () => {
          let currencies = await page
            .$$eval("table.cambio-table > tbody", (values) => {
              let currenciesArray = [];
              values = values.map((el) => el.innerText);
              let currencyStrings = values[0]
                .replaceAll("\t", " | ")
                .replaceAll("\n", " | ");
              currencyStrings = currencyStrings
                .split("|")
                .map((element) => element.trim());
              currencyStrings.forEach((word, index) => {
                const pattern = new RegExp("([A-Z])+[A-Z]");
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
            bankName: "Banco Comercial e de Investimentos, S.A.",
            currencies,
          };
          return resolve(sanitizedObject);
        })
        .catch((err) => reject(err));
    });
    return unicoPromise;
  },
};
module.exports = scraperObject;
