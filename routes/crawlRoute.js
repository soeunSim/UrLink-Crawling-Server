const express = require("express");

const { getCrawlingTitle } = require("../service/crawlingTitleService");
const { getCrawlingKeyword } = require("../service/crawlingKeywordService");

const router = express.Router();

router.get("/:url", getCrawlingTitle);
router.get("/:url/search", getCrawlingKeyword);

module.exports = router;
