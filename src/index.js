const { settings } = require("./settings");
const express = require("express");
const expressMeter = require("./observability/meter");
const { expressLogger, logger } = require("./observability/logger");

try {
  const port = process.env.PORT || settings.general.defaultPort || 3000;
  const app = express();

  app.use(expressLogger);
  app.use(expressMeter);

  app.get("/", (req, res) => {
    req.log.info("Visited homepage");
    req.log.error("Example error");
    req.log.debug("Example debug");
    req.log.trace("Example trace");
    res.send(`Hello ${settings.general.welcomeName}!`);
  });

  app.listen(port, () => {
    logger.info(`App listening on port ${port}!`);
  });
} catch (e) {
  logger.error(e);
}
