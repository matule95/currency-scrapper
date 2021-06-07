const scraperObject = {
  url: "https://www.bancomoc.mz/",
  scrapperName: "bancoMocambique",
  async executeScrapper(browser) {
    const bancoMocambique = new Promise(async (resolve, reject) => {
      let page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      await page.goto(this.url).catch((err) => reject(err));
      await page
        .waitForSelector("div.containner_right_Publica")
        .then(async () => {
          let currencies = page.$$eval(
            "div.containner_right_Publica",
            (values) => {
              let htmlElements = [];
              values.forEach((value) => {
                htmlElements
                  .push(value.innerText)
                  .toString()
                  .replaceAll("  ", "");
              });
              const splitString = htmlElements
                .toString()
                .replaceAll("\t", "|")
                .split("\n")
                .slice(4, 7)
                .toString()
                .split("|")
                .toString()
                .split(",");
              const currenciesArray = [];
              splitString.forEach((word, index) => {
                const pattern = new RegExp("([A-Z])+[A-Z]");
                if (pattern.test(word)) {
                  const currency = {};
                  currency.currency = word;
                  currency.buy = parseFloat(splitString[index + 1]);
                  currency.sell = parseFloat(splitString[index + 2]);
                  currenciesArray.push(currency);
                }
              });
              return {
                bankName: "Banco de Moçambique",
                currencies: currenciesArray,
              };
            }
          );
          return resolve(currencies);
        })
        .catch((error) => reject(error));
    });
    return bancoMocambique;
  },
};
module.exports = scraperObject;
