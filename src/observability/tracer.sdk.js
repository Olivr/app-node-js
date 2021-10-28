const { settings } = require("../settings");
const opentelemetry = require("@opentelemetry/sdk-node");
const { Resource } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { ExpressInstrumentation } = require("@opentelemetry/instrumentation-express");
const { PinoInstrumentation } = require("@opentelemetry/instrumentation-pino");
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");
const { SimpleSpanProcessor, BatchSpanProcessor } = require("@opentelemetry/sdk-trace-base");

const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]:
      process.env.SERVICE_NAME || settings.general.serviceName || "my-app",
  }),
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new PinoInstrumentation(),
  ],
  traceExporter: new JaegerExporter(),
  // spanProcessor: new BatchSpanProcessor(new JaegerExporter(), { scheduledDelayMillis: 100 }),
  // spanProcessor: new SimpleSpanProcessor(new JaegerExporter()),
});

sdk.start();
