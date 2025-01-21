const puppeteer = require("puppeteer");

const getCrawlingKeyword = async (req, res) => {
  const decodedLink = decodeURIComponent(req.params.url);
  const browser = await puppeteer.launch({ headless: true });

  try {
    const page = await browser.newPage();

    await page.goto(decodedLink);
    await page.waitForFunction(
      "window.performance.timing.loadEventEnd - window.performance.timing.navigationStart >= 500"
    );

    let textContent = await page.evaluate(() => document.body.textContent);
    const hasKeyword = textContent.includes(req.query.keyword);

    if (!hasKeyword) {
      textContent = `해당 키워드가 포함되어 있지 않은 url입니다.`;
    }

    return res.status(200).json({
      urlLink: req.params.url,
      keyword: req.query.keyword,
      hasKeyword: hasKeyword,
      urlText: textContent,
    });
  } catch (error) {
    return res.status(500).send({ message: `[ServerError occured] ${error}` });
  } finally {
    await browser.close();
  }
};

module.exports = { getCrawlingKeyword };
