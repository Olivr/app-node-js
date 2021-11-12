# Release

Before you can [deploy](deployment.md) your image, you must release it.

1. Build your image for production `yarn docker:prod:build`

2. Tag your version and publish your Docker image. For example:

   ```sh
   docker tag app-node-js <registry>/<your_username>/app-node-js:v1
   docker push <registry>/<your_username>/app-node-js:v1
   ```

   Where `<registry>` can be `docker.io` for [Docker Hub](https://docs.docker.com/docker-hub/), `ghcr.io` for [GitHub Container registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#pushing-container-images), `quay.io` for [RedHat Quay](https://docs.quay.io/solution/getting-started.html), etc.

> More guides for [Amazon ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html), [Azure Container registry](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-docker-cli?tabs=azure-cli), [Google Container registry](https://cloud.google.com/container-registry/docs/pushing-and-pulling)

---

[Develop](development.md) - Release - [Deploy](deployment.md) - [Observe](observability.md)
