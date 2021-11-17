# Release

Before you can [deploy](deployment.md) your image, you must release it.

## Automatically (recommended)

This repo contains a GitHub Actions [workflow to automatically publish an image](../.github/workflows/publish.yaml) to the GitHub Container Registry whenever you [create a GitHub release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release).

If you have the GH Cli installed, that's:

```sh
gh release create v1.0.0
```

## Manually

In the commands below, `<registry>` can be `docker.io` for [Docker Hub](https://docs.docker.com/docker-hub/), `ghcr.io` for [GitHub Container registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#pushing-container-images), `quay.io` for [RedHat Quay](https://docs.quay.io/solution/getting-started.html), etc.

More guides for [Amazon ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html), [Azure Container registry](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-docker-cli?tabs=azure-cli), [Google Container registry](https://cloud.google.com/container-registry/docs/pushing-and-pulling)

By default Docker images are built for Amd processors. With the rise of Arm processors (Apple Silicon M1, Raspberry Pi, etc.) It is recommended to build at least for both of these using [Buildx](https://docs.docker.com/desktop/multi-arch/).

1. Initiate Buildx builder if you haven't done so with `docker buildx create --use`

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

## Image signing

The [GH Actions workflow](../.github/workflows/publish.yaml) supports signing your image with [CoSign](https://github.com/sigstore/cosign). It follows the **experimental** [keyless](https://github.com/sigstore/cosign/blob/main/KEYLESS.md) process with [GitHub OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect).

To verify images created this way, you need to use the `COSIGN_EXPERIMENTAL` flag. For example:

```sh
COSIGN_EXPERIMENTAL=1 cosign verify ghcr.io/<your_username>/<repo_name>:latest
```

While this process is great for zero-config image signing, **it is still currently experimental** and you might want to [use your own pre-defined keys](https://docs.sigstore.dev/cosign/getting_started).

---

[Develop](development.md) - Release - [Deploy](deployment.md) - [Observe](observability.md)
