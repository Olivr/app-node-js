# Deploy your app

## Fly

[Guide](https://fly.io/docs/hands-on/start/)

1. Create your app in Fly if you haven't done so already `fly apps create`
2. Deploy your app `fly deploy --config ./manifests/fly/fly.toml --image app-node-js --app <your-app-name>`
3. View your app `fly open --app <your-app-name>`

> The given `fly.toml` is pre-configured with health checks on `/livez` and [Prometheus metrics](https://fly.io/docs/reference/metrics/#prerequisite).

## Heroku

[Guide](https://devcenter.heroku.com/articles/container-registry-and-runtime)

1. Login to Heroku `heroku auth:login`
2. Login to Heroku's internal container registry `heroku container:login`
3. Create your app in Heroku if you haven't done so already `heroku create`
4. Build and push your Docker image `heroku container:push web`
5. Release your app `heroku container:release web`
6. View your app `heroku open`

> Note this will create another build of your image locally (though using cache)

## Kubernetes

> Keep things organized by managing your deployments in a `deploy` folder (or even better in a specific "ops" repo if you have several apps/services)

1. Create the following file in `./deploy/prod/kustomization.yaml` (replace with the correct registry url from your [release](release.md))

   - ```yaml
     apiVersion: kustomize.config.k8s.io/v1beta1
     kind: Kustomization
     resources:
       - ../../manifests/k8s
     images:
       - name: app-node-js
         newName: <registry>/<your_username>/app-node-js
         newTag: v1
     ```

2. Apply to your cluster `kubectl apply -k ./deploy/prod`

> This is just the simplest example deployment, you could add so many other things like a [horizontal pod autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/), [service monitor](https://github.com/prometheus-operator/prometheus-operator/blob/main/Documentation/user-guides/getting-started.md), make use of [canary deployments](https://flagger.app/), etc.

---

[Develop](development.md) - [Release](release.md) - Deploy - [Observe](observability.md)
