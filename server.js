const express = require("express");

const crawlRoute = require("./routes/crawlRoute.js");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("get test");
});

app.use("/crawl", crawlRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
