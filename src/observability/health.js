const { logger } = require("./logger");

// https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes

// In k8s, not ready = stop sending traffic to container
function readinessCheck({ state }) {
  // `state.isShuttingDown` (boolean) shows whether the server is shutting down or not
  return Promise
    .resolve
    // optionally include a resolve value to be included as
    // info in the health check response
    ();
}

// In k8s, not live = restart container
function livenessCheck({ state }) {
  // `state.isShuttingDown` (boolean) shows whether the server is shutting down or not
  return Promise
    .resolve
    // optionally include a resolve value to be included as
    // info in the health check response
    ();
}

function onSignal() {
  logger.debug(`HTTP server is starting to clean up`);
  return Promise.all([
    // your clean logic, like closing database connections
  ]);
}

const healthOptions = {
  healthChecks: {
    "/readyz": readinessCheck,
    "/livez": livenessCheck,
    verbatim: true,
  },

  onSignal,
  beforeShutdown: () => {
    logger.info(`SIGTERM signal received: closing HTTP server in 11s`);
    return new Promise((resolve) => {
      setTimeout(resolve, 11000); // One more second than readiness interval check
    });
  },

  onShutdown: () => {
    logger.info(`HTTP server closed`);
  },

  logger: (msg, err) => logger.error(err), // [optional] logger function to be called with errors. Example logger call: ('error happened during shutdown', error). See terminus.js for more details.
};

module.exports = healthOptions;
