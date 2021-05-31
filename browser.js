const puppeteer = require("puppeteer");

async function startBrowser() {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });
  } catch (error) {
    console.log(error);
  }
  return browser;
}

module.exports = {
  startBrowser,
};
