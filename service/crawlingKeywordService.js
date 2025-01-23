const puppeteer = require("puppeteer");

function isCheckTrueThisUrl(url) {
  /* eslint-disable */
  const urlRegex = /^(http|https):\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (urlRegex.test(url)) {
    return true;
  } else {
    return false;
  }
}

const getCrawlingKeyword = async (req, res) => {
  const decodedLink = decodeURIComponent(req.params.url);
  const browser = await puppeteer.launch({ headless: true });

  try {
    const page = await browser.newPage();

    await page.goto(decodedLink);

    let innerText = await page.evaluate(() => document.body.innerText);
    const hasKeyword = innerText.includes(req.query.keyword);

    if (hasKeyword === true) {
      return res.status(200).json({
        urlLink: req.params.url,
        keyword: req.query.keyword,
        hasKeyword: hasKeyword,
        urlText: innerText,
      });
    } else if (hasKeyword === false) {
      return res.status(200).send({ message: `[This keyword does not exist]` });
    }
  } catch (error) {
    if (isCheckTrueThisUrl(decodedLink) === false) {
      return res
        .status(400)
        .send({ message: `[Invalid Characters in HTTP request]  ${error}` });
    } else {
      return res
        .status(500)
        .send({ message: `[ServerError occured] ${error}` });
    }
  } finally {
    await browser.close();
  }
};

module.exports = { getCrawlingKeyword };
