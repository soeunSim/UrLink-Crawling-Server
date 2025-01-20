const express = require("express");
const { crawlingService } = require("../service/crawlingService");
const router = express.Router();

router.get("/", crawlingService);

module.exports = router;
