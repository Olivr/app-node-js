# Release

Before you can [deploy](deployment.md) your image, you must release it.

## Automatically

This repo contains a GitHub Actions [workflow to automatically publish an image](../.github/workflows/publish.yaml) to the GitHub Container Registry whenever you [create a GitHub release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release).

## Manually

In the commands below, `<registry>` can be `docker.io` for [Docker Hub](https://docs.docker.com/docker-hub/), `ghcr.io` for [GitHub Container registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#pushing-container-images), `quay.io` for [RedHat Quay](https://docs.quay.io/solution/getting-started.html), etc.

More guides for [Amazon ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html), [Azure Container registry](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-docker-cli?tabs=azure-cli), [Google Container registry](https://cloud.google.com/container-registry/docs/pushing-and-pulling)

### Multi-platform (recommended)

By default Docker images are built for Amd processors. With the rise of Arm processors (Apple Silicon M1, Raspberry Pi, etc.) It is recommended to build at least for both of these using [Buildx](https://docs.docker.com/desktop/multi-arch/).

1. Initiate Buildx builder if you haven't done so `docker buildx create --use`

2. Build, tag and publish your image:

   ```sh
   docker buildx build \
   --platform linux/arm64,linux/amd64 \
   --build-arg node_version=$(<.nvmrc) \
   --tag <registry>/<your_username>/app-node-js:1.0.0 \
   --tag <registry>/<your_username>/app-node-js:latest \
   --label org.opencontainers.image.source=https://github.com/<your_username>/<repo_name> \
   --push \
   .
   ```

   > More Open Container [annotations](https://github.com/opencontainers/image-spec/blob/main/annotations.md#pre-defined-annotation-keys)

### Single platform

1. Build your image for production

   ```sh
   docker build \
   --build-arg node_version=$(<.nvmrc) \
   --tag app-node-js \
   .
   ```

2. Tag your version and publish your Docker image. For example:

   ```sh
   docker tag app-node-js <registry>/<your_username>/app-node-js:1.0.0
   docker tag app-node-js <registry>/<your_username>/app-node-js:latest
   docker push <registry>/<your_username>/app-node-js --all-tags
   ```

---

[Develop](development.md) - Release - [Deploy](deployment.md) - [Observe](observability.md)
