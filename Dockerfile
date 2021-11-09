# This is a multi stage build
# When no built target is specified, the last stage ("prod") is used
# https://docs.docker.com/develop/develop-images/multistage-build/

ARG node_version

# Stage "dev": Complete OS + all app files
# Used for local development
FROM node:${node_version} AS dev
HEALTHCHECK --interval=10s CMD node /app/hack/healthcheck.js
EXPOSE 3000
EXPOSE 9229
WORKDIR /app
COPY hack/healthcheck.js ./hack/
ARG node_env=production
ENV NODE_ENV $node_env
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY src ./src
# We suppose that any build targeting dev will use node_env=development or will change the entrypoint
ENTRYPOINT ["./node_modules/nodemon/bin/nodemon.js"]
CMD ["--inspect=0.0.0.0", "src/index.js"]

# Stage "debug": Stripped down OS + busybox shell + files required to run app
# Used for debugging in a prod-like container
FROM gcr.io/distroless/nodejs:${node_version}-debug AS debug
HEALTHCHECK --interval=10s CMD ["/nodejs/bin/node", "hack/healthcheck.js"]
EXPOSE 3000
EXPOSE 9229
WORKDIR /app
COPY --from=dev /app/hack/healthcheck.js /app/hack/
COPY --from=dev /app/node_modules /app/node_modules
COPY --from=dev /app/src /app
USER nonroot
CMD ["--inspect=0.0.0.0", "index.js"]

# Stage "prod": Stripped down OS + files required to run app
# Used for running app in production
FROM gcr.io/distroless/nodejs:${node_version} AS prod
EXPOSE 3000
HEALTHCHECK --interval=10s CMD ["/nodejs/bin/node", "hack/healthcheck.js"]
WORKDIR /app
COPY --from=debug /app /app
USER nonroot
CMD ["index.js"]
