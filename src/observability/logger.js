const expressLogger = require("pino-http")();

const logger = expressLogger.logger;
logger.level = process.env.LOG_LEVEL || "info";

module.exports = { expressLogger, logger };
