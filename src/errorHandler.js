const { trace, context } = require("@opentelemetry/api");

// This is an example to get a trace ID in code.
// When an error arises, this could be displayed to the user, saved to his profile, sent to Slack, etc.

// 404 errors
const notFoundHandler = (req, res, next) => {
  const traceId = trace.getSpan(context.active()).spanContext().traceId;
  res.status(404).send(`Page not found. Trace ID: ${traceId}`);
};

// Other errors
const errorHandler = (err, req, res, next) => {
  const traceId = trace.getSpan(context.active()).spanContext().traceId;
  res.status(500).send(`Something broke! Trace ID: ${traceId}`);
};

module.exports = { notFoundHandler, errorHandler };
