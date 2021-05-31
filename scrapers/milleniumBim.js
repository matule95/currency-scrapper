const scraperObject = {
  url: "https://millenniumbim.co.mz/pt/particulares",
  async executeScrapper(browser) {
    const milleniumPromise = new Promise(async (resolve, reject) => {
      let page = await browser.newPage();
      await page.goto(this.url).catch((err) => reject(err));
      await page.waitForSelector(".rates-card-one").catch((err) => reject(err));
      let currencies = await page
        .$$eval(".rates-card-one > .rates-values > .values", (values) => {
          values = values.map((el) => {
            const currency = {};
            currency.currency = el.querySelector("span").innerText;
            currency.buy = parseFloat(
              el
                .querySelector("span.float-right.buy")
                .innerText.replace(/,/, ".")
            );
            currency.sell = parseFloat(
              el
                .querySelector("span.float-right.sell")
                .innerText.replace(/,/, ".")
            );
            return currency;
          });
          return values.sort((a, b) => a.currency.localeCompare(b.currency));
        })
        .catch((err) => reject(err));
      const sanitizedObject = {
        bankName: "BIM - Banco Internacional de Moçambique, S.A.",
        currencies,
      };
      return resolve(sanitizedObject);
    });
    return milleniumPromise;
  },
};

module.exports = scraperObject;
