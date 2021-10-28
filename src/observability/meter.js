const express = require("express");
const prometheus = require("prom-client");

const register = new prometheus.Registry();
prometheus.collectDefaultMetrics({ register });

const router = express.Router();
router.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (e) {
    req.log.error(e);
    res.status(500).end(e);
  }
});

module.exports = router;
