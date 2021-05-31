const scraperObject = {
  url: "https://firstcapitalbank.co.mz/pt/",
  async executeScrapper(browser) {
    const fnbPromise = new Promise(async (resolve, reject) => {
      let page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      await page.goto(this.url).catch((err) => reject(err));
      await page
        .waitForSelector("section.content-wrapper.bottom-border")
        .then(async () => {
          let currencies = await page.$$eval(
            "div.forex > div.forex-slider.owl-carousel.owl-loaded > div.owl-stage-outer > div.owl-stage",
            (values) => {
              let htmlElements = [];
              values.forEach((value) => {
                htmlElements
                  .push(value.innerText)
                  .toString()
                  .replaceAll("  ", "")
                  .replaceAll("\n", "");
              });
              const splitString = [
                ...new Set(htmlElements.toString().split("\n")),
              ].filter((string) => string !== "Venda" && string !== "Compra");
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
                bankName: "First Capital Bank - Moçambique",
                htmlElements: currenciesArray,
              };
            }
          );
          return resolve(currencies);
        });
    });
    return fnbPromise;
  },
};
module.exports = scraperObject;
