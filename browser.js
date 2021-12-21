const puppeteer = require("puppeteer");
const { dispatch } = require("./logger");
async function startBrowser() {
  let browser;
  try {
    dispatch("Initializing Browser Instance");
    browser = await puppeteer.launch({
      headless: true,
      args: ["--disable-setuid-sandbox", "--no-sandbox"],
      ignoreHTTPSErrors: true,
    });
  } catch (error) {
    dispatch(`Failed to Initialize Browser Instance: ${error}`);
  }
  return browser;
}

module.exports = {
  startBrowser,
};
