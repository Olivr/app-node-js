# Observability

## Health

Readiness and liveness endpoints are available on [/readyz](http://localhost:3000/readyz) and [/livez](http://localhost:3000/livez) to be consumed by Kubernetes or your cloud health checker. Additionally, a tool is located in `hack/healthcheck.js` to be consumed by Docker's native health check feature.

## Logs

All logs are on `STDOUT`. They can be scraped by [collectors](#collection).
The log level can be changed with the environment variable `LOG_LEVEL`, take a look at the [pino docs](https://getpino.io/#/docs/api?id=logger-level) for available values.

## Metrics

All metrics are accessible on [`/metrics`](http://localhost:3000/metrics). They can be scraped by [collectors](#collection).

## Traces

Traces are sent to a Jaeger instance or any compatible [agent](#collection). You can use the environment variable `OTEL_EXPORTER_JAEGER_ENDPOINT` to change the Jaeger endpoint (eg. `http://jaeger:14268/api/traces`).

> It is very easy to [replace Jaeger with Zipkin](https://opentelemetry.io/docs/js/exporters/#zipkin) or [another exporter](https://opentelemetry.io/registry/?language=js&component=exporter#) in [./src/observability/tracer.js](../src/observability/tracer.js).

## Tools

This is a non-exhaustive list of OSS tools you can use for observability, there is a more [exhaustive list](https://github.com/adriannovegil/awesome-observability).

> Observability is a hot topic and many tools evolve rapidly towards supporting all three of metrics, logs, traces.

### Collection

- [Fluent Bit](https://fluentbit.io/) `metrics` `logs`
- [Grafana Agent](https://grafana.com/docs/agent/latest/) `metrics` `logs` `traces`
- [Jaeger](https://www.jaegertracing.io/) `traces`
- [Logstash](https://github.com/elastic/logstash) `logs`
- [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) `metrics` `logs` `traces`
- [Prometheus](https://prometheus.io) `metrics`
- [Promtail](https://grafana.com/docs/loki/latest/clients/promtail/) `logs`
- [Telegraf](https://github.com/influxdata/telegraf) `metrics` `logs` `traces`
- [Vector](https://vector.dev/) `metrics` `logs` `traces`

### Storage

- [Elasticsearch](https://github.com/elastic/elasticsearch) `metrics` `logs` `traces`
- [Jaeger](https://www.jaegertracing.io/) `traces`
- [Loki](https://grafana.com/docs/loki/latest/) `logs`
- [Prometheus](https://prometheus.io) `metrics`
- [Tempo](https://grafana.com/docs/tempo/latest/) `traces`

### Visualization

- [Grafana](https://grafana.com/docs/grafana/latest/) `metrics` `logs` `traces`
- [Jaeger](https://www.jaegertracing.io/) `traces`
- [Kibana](https://github.com/elastic/kibana) `metrics` `logs` `traces`

---

[Develop](development.md) - [Release](release.md) - [Deploy](deployment.md) - Observe
