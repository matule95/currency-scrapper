const scraperObject = {
  url: "https://www.bancounico.co.mz/",
  async executeScrapper(browser) {
    const unicoPromise = new Promise(async (resolve, reject) => {
      let page = await browser.newPage();
      await page.goto(this.url).catch((err) => reject(err));
      await page
        .waitForSelector("#ContentPlaceHolderDefault_Cambios_15_Lab_Info1")
        .catch((err) => reject(err));
      let currencies = await page
        .$$eval(
          "span#ContentPlaceHolderDefault_Cambios_15_Lab_Info1",
          (values) => {
            let currenciesArray = [];
            values = values
              .map((el) => el.querySelector("table > tbody"))
              .map((el) => el.innerText);
            let currencyStrings = values[0]
              .replaceAll("\t", " | ")
              .replaceAll("\n", " | ")
              .replaceAll(" | Compra | Venda ", "")
              .replace("| ", "")
              .trim();
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
        bankName: "Banco Único",
        currencies,
      };
      return resolve(sanitizedObject);
    });
    return unicoPromise;
  },
};
module.exports = scraperObject;
