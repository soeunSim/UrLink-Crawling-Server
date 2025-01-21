const puppeteer = require("puppeteer");

const getCrawlingTitle = async (req, res) => {
  const decodedLink = decodeURIComponent(req.params.url);
  const browser = await puppeteer.launch({ headless: true });

  try {
    const page = await browser.newPage();

    await page.goto(decodedLink);
    await page.waitForFunction(
      "window.performance.timing.loadEventEnd - window.performance.timing.navigationStart >= 500"
    );

    const element = await page.$("title");
    const title = await page.evaluate(
      (element) => element.textContent,
      element
    );

    return res.status(200).json({
      title,
    });
  } catch (error) {
    return res.status(500).send({ message: `[ServerError occured] ${error}` });
  } finally {
    await browser.close();
  }
};

module.exports = { getCrawlingTitle };
