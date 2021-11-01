// Observability
require("./observability/tracer");
const { expressLogger, logger } = require("./observability/logger");
const expressMeter = require("./observability/meter");
const healthOptions = require("./observability/health");
const { createTerminus } = require("@godaddy/terminus");

const { settings } = require("./settings");
const http = require("http");
const express = require("express");
const { notFoundHandler, errorHandler } = require("./errorHandler");

try {
  const port = process.env.PORT || settings.general.defaultPort || 3000;
  const app = express();

  app.use(expressLogger);
  app.use(expressMeter);

  app.get("/", (req, res) => {
    req.log.info("Visited homepage");
    res.send(`Hello ${settings.general.welcomeName}!`);
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  const server = http.createServer(app);
  createTerminus(server, healthOptions);

  server.listen(port, () => {
    logger.info(`App listening on port ${port}!`);
  });
} catch (e) {
  logger.error(e);
}
