# Local development

You can work on your app in three ways:

- Using your local Node.js installation
- In a container running in Docker
- In a container running in Kubernetes

## Prerequisite

> If you use homebrew, just run `brew bundle` to make use of our [Brewfile](../Brewfile)

- [NVM](https://github.com/nvm-sh/nvm)
- [Yarn](https://classic.yarnpkg.com/en/)
- [Docker](https://docs.docker.com/get-docker/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Tilt](https://docs.tilt.dev/install.html)

Optional:

- [GitHub CLI](https://cli.github.com/)
- [CoSign](https://github.com/sigstore/cosign)

### Kubernetes

You need to start your local cluster before you can use the `yarn k8s:` commands.

There are [many clusters to choose from](https://docs.tilt.dev/choosing_clusters.html).

You should test various options until you find one that is suitable for your environment and your level of k8s understanding. Personally, I like the cluster that comes with Docker Desktop because built images are instantly available in the cluster which makes the feedback loop shorter. Second on my list is [k3d](https://github.com/rancher/k3d) which also has a [desktop app](https://rancherdesktop.io/).

You'll probably also want to install [Lens](https://k8slens.dev/).

## Run your app

1. Install dependencies with `nvm install && nvm use && yarn`

2. Start your app:

   - **Local**: `yarn dev`
   - **Docker**: `yarn docker:dev`
   - **Kubernetes**: `yarn k8s:dev`

     > If not using Docker desktop, expect the first start to be much slower as the base image layer is downloaded from the remote registry, pushed to a local registry, and finally downloaded to your cluster from the local registry.

3. Watch the logs:

   - **Local/Docker**: in your terminal
   - **Kubernetes**: in your terminal by pressing `s` or press `space` to watch them in the [Tilt UI](http://localhost:10350)

4. View your app on http://localhost:3000

## Live-reload

1. Change something in your source code
2. Watch your logs and see how quickly the server is restarted
3. Refresh your browser and you should see the change in your app

## View traces in Jaeger

Your app comes with several plugins for observability, refer to the [observability](observability.md) section for more details.

1. Start a local Jaeger instance: `yarn jaeger:init`
2. Open the Jaeger UI: http://localhost:16686
3. Make a request to [your app](http://localhost:3000)
4. Note the `trace_id` in the logs and search for it in the Jaeger UI

### Running in Kubernetes

Depending on your chosen local cluster solution, it may or may not be able to access the above created Jaeger instance. If not, follow these steps to run a Jaeger instance in k8s:

1. In `manifests/k8s/deployment.yaml`, set the value of `OTEL_EXPORTER_JAEGER_ENDPOINT` environment variable to `http://jaeger:14268/api/traces`
2. When starting your app, make use of the _infra_tiltfile_ flag.
   (eg. `yarn k8s:dev --infra_tiltfile ./hack/example-infra/k8s/Tiltfile`)
3. This configures access to Jaeger UI on http://localhost:16687 so the port doesn't clash with the other Jaeger instance running for local/docker development.

## Test

For production-like testing on your local machine:

- **Docker**: `yarn docker:prod`
- **Kubernetes**: `yarn k8s:prod`

### Debug image

The [distroless debug image](https://github.com/GoogleContainerTools/distroless#debug-images) is the same image as the prod image but with shell access.

- **Docker**: `yarn docker:debug`
- **Kubernetes**: `yarn k8s:debug`

## Debugger

### VS Code

1. Add a breakpoint to a line in your code
2. Go to the **Run and Debug** tab
3. Choose the debugger configuration for your running app from the dropdown:
   - **Local**: Attach to Node.js
   - **Docker/k8s** (dev): Attach to Node.js
   - **Docker/k8s** (debug): Attach to Node.js
4. Click on _Start debugging_ (F5)
5. Refresh your app in your browser
6. You can see the app stopping at the breakpoint
7. Continue debugging in VS Code

## Playbooks

### Change app/image name

- Edit `name` and `config.image` in `package.json`
- Update [manifests](../manifests)
- Update documentation

### Change Node version

- Edit `engines.node` in `package.json`
- Edit `.nvmrc`

---

Develop - [Release](release.md) - [Deploy](deployment.md) - [Observe](observability.md)
