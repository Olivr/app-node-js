# This is a multi-stage build
# https://docs.docker.com/develop/develop-images/multistage-build/

# Stage 1: Use an image containing all the bells and whistles needed to build a NodeJS app
# This is the image used for local development
FROM node:16 AS dev
ARG node_env=production
ENV NODE_ENV $node_env
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY src ./src
EXPOSE 3000
EXPOSE 9229
# We suppose that any build targeting dev will use node_env=development or will change the entrypoint
ENTRYPOINT ["./node_modules/nodemon/bin/nodemon.js"]
CMD ["--inspect=0.0.0.0", "src/index.js"]

# Stage 2: Use a debug distroless image and copy only the folder containing the build
# This is the image used for debugging prod-like containers
FROM gcr.io/distroless/nodejs:16-debug AS debug
WORKDIR /app
COPY --from=dev /app/node_modules /app/
COPY --from=dev /app/src /app
EXPOSE 3000
EXPOSE 9229
USER nonroot
CMD ["--inspect=0.0.0.0", "index.js"]

# Stage 3: Use a production distroless image and copy only the folder containing the build
# This is the image that is retained to be published to the registry if no build target is specified
# It should be used for production
FROM gcr.io/distroless/nodejs:16 AS prod
WORKDIR /app
COPY --from=debug /app /app
EXPOSE 3000
USER nonroot
CMD ["index.js"]
