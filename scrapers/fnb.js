const scraperObject = {
    url: 'https://www.fnb.co.mz/',
    async executeScrapper(browser) {
        const fnbPromise = new Promise(async (resolve, reject) => {
            let page = await browser.newPage();
            await page.goto(this.url).catch((err) => reject(err));
            await page.waitForSelector('div#cambiosGrid').then(async (data) => {
                let currencies = await page.$$eval('div#cambiosGrid > div > table > tbody', values => {
                    let htmlElements = []
                    values.forEach((value) => {
                        htmlElements.push(value.innerHTML.replaceAll("\t", "").replaceAll("\n", "").replaceAll("  ", "").trim())
                    })
                    const strings = htmlElements.toString().trim().split(/<td align="center">(.*?)<\/td>/)
                    const sanitizedArray = []
                    strings.forEach((string,index) => {
                        const regex = RegExp('/\\s/g')
                        const sanitizedString = string.toString()
                        if(sanitizedString.length < 8 && sanitizedString.length > 2 && !sanitizedString.includes('<') && !regex.test(sanitizedString)) {
                            sanitizedArray.push(sanitizedString)
                        }
                    })
                    const sanitizedCurrencies = []
                    sanitizedArray.forEach((string, index) => {
                        const regex = RegExp('/\\s/g')
                        if(string.length < 8 && string.length > 2 && !string.includes('<') && !regex.test(string)) {
                            const pattern = new RegExp('([A-Z])+[A-Z]')
                            if (pattern.test(string)) {
                                const currency = {}
                                currency.currency = string
                                currency.buy = parseFloat(sanitizedArray[index + 1].replace(/,/, '.'))
                                currency.sell = parseFloat(sanitizedArray[index + 2].replace(/,/, '.'))
                                sanitizedCurrencies.push(currency)
                            }
                        }
                    })
                    return {
                        bankName: "First National Bank - Moçambique",
                        currencies: sanitizedCurrencies.sort((a, b) => a.currency > b.currency && 1 || -1)
                    }
                    })
                return resolve(currencies)
            })
        })
        return fnbPromise
    }

}
module.exports = scraperObject;