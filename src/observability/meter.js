const express = require("express");
const { getSummary, getContentType } = require("@promster/express");

const router = express.Router();
router.get("/metrics", async (req, res) => {
  try {
    req.statusCode = 200;
    res.setHeader("Content-Type", getContentType());
    res.end(await getSummary());
  } catch (e) {
    req.log.error(e);
    res.status(500).end(e);
  }
});

module.exports = router;
