require("./observability/tracer");
const { expressLogger, logger } = require("./observability/logger");
const expressMeter = require("./observability/meter");
const { settings } = require("./settings");
const express = require("express");

try {
  const port = process.env.PORT || settings.general.defaultPort || 3000;
  const app = express();

  app.use(expressLogger);
  app.use(expressMeter);

  app.get("/", (req, res) => {
    req.log.info("Visited homepage");
    res.send(`Hello ${settings.general.welcomeName}!`);
  });

  app.listen(port, () => {
    logger.info(`App listening on port ${port}!`);
  });
} catch (e) {
  logger.error(e);
}
