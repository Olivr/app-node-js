# Node.js App (Javascript)

Start developing straight away your app using Node.js and be ready to publish it to production.

## Features

- Supports any combination of:

  - Image types:

    - Development (Official Docker image)
    - Production (Official distroless image)
    - Production debugging (Official distroless debug image)

  - Environments:

    - Local Node.js install
    - Docker
    - Kubernetes

- Multi-stage Docker build with 3 image types
- Live file updates for faster development feedback
- Use debugger such as VS Code
- Full observability (logs, metrics, traces)

## Prerequisite

- [**Yarn**](https://classic.yarnpkg.com/en/)
- [Docker](https://docs.docker.com/get-docker/) (if you want to use Docker or Kubernetes)
- [Tilt](https://docs.tilt.dev/install.html) (if you want to use Kubernetes)
- [Kind](https://kind.sigs.k8s.io/) (if you want to use Kubernetes)
- [ctlptl](https://github.com/tilt-dev/ctlptl) (if you want to use Kubernetes)

## Installation

1. [Use this repo as a template](https://github.com/Olivr/app-node-js/generate) to create your own repo
2. Clone your repo
3. Search and replace `my-app` with your app name

Setup your local Kubernetes cluster and a local docker registry:

```sh
yarn k8s:init
```

## Develop

> You will notice each environment has its own port for running the app as well as for the debugger so you can run them in parallel if you need to

### Local Node.js install (fastest feedback)

1. Start your app

   ```sh
   yarn dev
   ```

2. Watch the logs in your terminal

3. View your app on http://localhost:3000

### Docker (slower feedback)

1. Start your app

   ```sh
   yarn docker:dev
   ```

2. Watch the logs in your terminal

3. View your app on http://localhost:3001

### Kubernetes (slower feedback)

1. If you don't have a local cluster yet, create it with `yarn k8s:init`

2. Start your app

   ```sh
   yarn k8s:dev
   ```

   > The first time will be much slower as it needs to download your base image, push it to your local registry, and finally have k8s download it from your local registry (!)

3. Watch the logs in your terminal by pressing `s` or press `space` to watch them in the Tilt UI

4. View your app on http://localhost:3002

## Live-reload

1. Change _hello_ to _goodbye_ in `src/index.js`
2. Watch your logs and see how quickly the server is restarted
3. Refresh your browser and see how your app displays the change

## Debug

### VS Code

1. Add a breakpoint to the line `` res.send(`Hello ${settings.general.welcomeName}!`) `` in `src/index.js`
2. Go to the "Run and Debug" tab
3. Choose the debugger configuration for your running app from the dropdown:
   - Local: Attach to Node.js
   - Docker: Attach to Node.js
   - K8s: Attach to Node.js
4. Click on _Start debugging_ (F5)
5. Refresh your app
6. You can now use the debugger

## Observability

### Logs

All logs are on `STDOUT`. They can be scraped by [collectors](#collection).
The log level can be changed with the environment variable `LOG_LEVEL`, take a look at the [pino docs](https://getpino.io/#/docs/api?id=logger-level) for available values.

### Metrics

All metrics are accessible on the `/metrics` endpoint (eg. http://localhost:3000/metrics). They can be scraped by [collectors](#collection).

### Traces

Traces are sent to a Jaeger instance or any compatible [agent](#collection). Note that it is very easy to [replace Jaeger with Zipkin](https://opentelemetry.io/docs/js/exporters/#zipkin) or [another exporter](https://opentelemetry.io/registry/?language=js&component=exporter#).

#### Example with Jaeger

1. Start a local Jaeger instance with `yarn jaeger:init`
2. Open the Jaeger UI located at http://localhost:16686
3. Make a request to your app (eg. http://localhost:3000), note the `trace_id` in the logs and search for it in the Jaeger UI

### Tools

This is a non-exhaustive list of OSS tools you can use for observability, there is a more [exhaustive list](https://github.com/adriannovegil/awesome-observability).

#### Collection

- [Fluent Bit](https://fluentbit.io/) `metrics` `logs`
- [Grafana Agent](https://grafana.com/docs/agent/latest/) `metrics` `logs` `traces`
- [Jaeger](https://www.jaegertracing.io/) `traces`
- [Logstash](https://github.com/elastic/logstash) `logs`
- [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) `metrics` `logs` `traces`
- [Prometheus](https://prometheus.io) `metrics`
- [Promtail](https://grafana.com/docs/loki/latest/clients/promtail/) `logs`
- [Telegraf](https://github.com/influxdata/telegraf) `metrics` `logs` `traces`
- [Vector](https://vector.dev/) `metrics` `logs` `traces`

#### Storage

- [Elasticsearch](https://github.com/elastic/elasticsearch) `metrics` `logs` `traces`
- [Jaeger](https://www.jaegertracing.io/) `traces`
- [Loki](https://grafana.com/docs/loki/latest/) `logs`
- [Prometheus](https://prometheus.io) `metrics`
- [Tempo](https://grafana.com/docs/tempo/latest/) `traces`

#### Visualization

- [Grafana](https://grafana.com/docs/grafana/latest/) `metrics` `logs` `traces`
- [Jaeger](https://www.jaegertracing.io/) `traces`
- [Kibana](https://github.com/elastic/kibana) `metrics` `logs` `traces`

> Note that observability is a hot topic and many tools evolve rapidly towards supporting all three of metrics, logs, traces.
