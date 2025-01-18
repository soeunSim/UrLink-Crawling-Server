const puppeteer = require('puppeteer');
const crawlingService = (async () => {

  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto('https://example.com');

  await page.waitForFunction(
    'window.performance.timing.loadEventEnd - window.performance.timing.navigationStart >= 500'
  );

  const pageSourceHTML = await page.content();

  await browser.close();

  console.log(pageSourceHTML);
})();

module.exports = { crawlingService };
