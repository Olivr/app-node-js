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
- Full observability suite:
  - Logging with [Pino](https://getpino.io)
  - Metrics with [Prom-client](https://github.com/siimon/prom-client)
  - Tracing with [OpenTelemetry](https://opentelemetry.io)

## How to use it

### Prerequisite

- [**Yarn**](https://classic.yarnpkg.com/en/)
- [Docker](https://docs.docker.com/get-docker/) (if you want to use Docker or Kubernetes)
- [Tilt](https://docs.tilt.dev/install.html) (if you want to use Kubernetes)
- [Kind](https://kind.sigs.k8s.io/) (if you want to use Kubernetes)
- [ctlptl](https://github.com/tilt-dev/ctlptl) (if you want to use Kubernetes)

### Installation

1. [Use this repo as a template](https://github.com/Olivr/app-node-js/generate) to create your own repo
2. Clone your repo
3. Search and replace `my-app` with your app name

Setup your local Kubernetes cluster and a local docker registry:

```sh
yarn k8s:init
```

### Develop

> You will notice each environment has its own port for running the app as well as for the debugger so you can run them in parallel if you need to

#### Local Node.js install (fastest feedback)

1. Start your app

   ```sh
   yarn dev
   ```

   > `yarn dev` is an alias for `yarn dev:local`

2. Watch the logs in your terminal

3. View your app

   ```sh
   open http://localhost:3000
   ```

#### Docker (slower feedback)

1. Start your app

   ```sh
   yarn dev:docker
   ```

2. Watch the logs

   ```sh
   yarn docker:logs
   ```

3. View your app

   ```sh
   open http://localhost:3001
   ```

#### Kubernetes (slower feedback)

1. If you don't have a local cluster yet, create it with `yarn k8s:init`

2. Start your app

   ```sh
   yarn dev:k8s
   ```

   > The first time will be much slower as it needs to download your base image, push it to your local registry, and finally have k8s download it from your local registry (!)

3. Watch the logs in your terminal by pressing `s` or press `space` to watch them in the Tilt UI

4. View your app

   ```sh
   open http://localhost:3002
   ```

### Live-reload

1. Change _hello_ to _goodbye_ in `src/index.js`
2. Watch your logs and see how quickly the server is restarted
3. Refresh your browser and see how your app displays the change

### Debug

#### VS Code

1. Add a breakpoint to the line `` res.send(`Hello ${settings.general.welcomeName}!`) `` in `src/index.js`
2. Go to the "Run and Debug" tab
3. Choose the debugger configuration for your running app from the dropdown:
   - Local: Attach to Node.js
   - Docker: Attach to Node.js
   - K8s: Attach to Node.js
4. Click on _Start debugging_ (F5)
5. Refresh your app
6. You can now use the debugger

### Observability

#### Logs

All logs are on `STDOUT`. They can be scraped by tools like Promtail, Fluent Bit, etc.

#### Metrics

All metrics are accessible on the `/metrics` endpoint (eg. `open http://localhost:3000/metrics`). They can be scraped by Prometheus and other compatible tools.

#### Traces

Traces are sent to a Jaeger instance or any compatible collector such as the [OTEL collector](https://opentelemetry.io/docs/collector/).

1. Start a local Jaeger instance with `yarn jaeger:init`
2. Open the Jaeger UI located at http://localhost:16686
3. Make a request to your app (eg. `curl http://localhost:3000`), note the `trace_id` in the logs and search for it in the Jaeger UI
