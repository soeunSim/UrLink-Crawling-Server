const puppeteer = require("puppeteer");

const getCrawling = async (link, res) => {
  const decodedLink = decodeURIComponent(link);

  console.log("decodedLink: ", decodedLink);

  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(link);

  await page.waitForFunction(
    "window.performance.timing.loadEventEnd - window.performance.timing.navigationStart >= 500"
  );

  // const pageSourceHTML = await page.content();
  // const innertext = await page.evaluate(() => document.body.innerText);
  // console.log("innertext: ", innertext);

  const element = await page.$("title"); // Example selector: h1

  const textContent = await page.evaluate(
    (element) => element.textContent,
    element
  );

  await browser.close();

  return res.status(200).json({
    textContent,
  });
};

module.exports = { getCrawling };
