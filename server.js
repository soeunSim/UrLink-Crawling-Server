require("dotenv").config();

const express = require("express");
const cors = require("cors");
const crawlRoute = require("./routes/crawlRoute.js");
const app = express();
const port = process.env.port || 3000;

app.use("/crawl", crawlRoute);

app.use(cors());

app.listen(port);
