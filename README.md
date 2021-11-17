# Node.js App (Javascript)

Production-ready Node.js app.

## Key features

- Local development on your native Node.js installation or any combination of:
  - **Image**: Development ([Official Node.js image](https://hub.docker.com/_/node)), Production ([Official distroless image](https://github.com/GoogleContainerTools/distroless)), Production debugging ([Official distroless debug image](https://github.com/GoogleContainerTools/distroless#debug-images))
  - **Environment**: Docker, Kubernetes
- Multi-stage Docker build
- Live reload for faster development feedback
- Pre-configured VS Code debugger
- Full observability (health, logs, metrics, traces)
- Graceful shutdowns
- Example deployments to Kubernetes, Heroku and Fly

## Getting started

1. Create your own repo [from this template](https://github.com/Olivr/app-node-js/generate) or [fork it](https://github.com/Olivr/app-node-js/fork)
2. Clone your repo to your computer
3. Search and replace `app-node-js` with your app name (this should update `package.json`, k8s manifests, docs)
4. Search and replace `your app` with your app title (this should update docs)
5. Remove this **Getting started** section
6. Commit your changes!

## [Develop](docs/development.md)

## [Release](docs/release.md)

## [Deploy](docs/deployment.md)

## [Observe](docs/observability.md)
