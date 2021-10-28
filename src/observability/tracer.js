const { settings } = require("../settings");
const opentelemetry = require("@opentelemetry/api");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { Resource } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { ExpressInstrumentation } = require("@opentelemetry/instrumentation-express");
const { PinoInstrumentation } = require("@opentelemetry/instrumentation-pino");
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");
const { SimpleSpanProcessor, BatchSpanProcessor } = require("@opentelemetry/sdk-trace-base");

const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]:
      process.env.SERVICE_NAME || settings.general.serviceName || "my-app",
  }),
});

registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new PinoInstrumentation(),
  ],
});

provider.addSpanProcessor(new BatchSpanProcessor(new JaegerExporter()));
provider.register();
