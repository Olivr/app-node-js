const { describe, it, before, after } = require("node:test");
const assert = require("node:assert");
const http = require("node:http");

function request(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:${process.env.TEST_PORT || 3001}${path}`, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    });
    req.on("error", reject);
  });
}

describe("App", () => {
  let server;

  before(async () => {
    const port = process.env.TEST_PORT || 3001;
    process.env.PORT = port;

    // Import the app modules after setting PORT
    require("../src/observability/tracer");
    const { expressLogger, logger } = require("../src/observability/logger");
    const expressMeter = require("../src/observability/meter");
    const healthOptions = require("../src/observability/health");
    const { createTerminus } = require("@godaddy/terminus");
    const express = require("express");
    const { notFoundHandler, errorHandler } = require("../src/errorHandler");
    const { createMiddleware } = require("@promster/express");

    const app = express();
    app.use(createMiddleware({ app }));
    app.use(expressLogger);
    app.use(expressMeter);

    app.get("/", (req, res) => {
      req.log.info("Visited homepage");
      res.send("Hello world!");
    });

    app.use(notFoundHandler);
    app.use(errorHandler);

    server = http.createServer(app);
    createTerminus(server, healthOptions);

    await new Promise((resolve) => server.listen(port, resolve));
  });

  after(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  it("should respond with Hello world! on GET /", async () => {
    const res = await request("/");
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body, "Hello world!");
  });

  it("should return health status on GET /livez", async () => {
    const res = await request("/livez");
    assert.strictEqual(res.statusCode, 200);
    const body = JSON.parse(res.body);
    assert.strictEqual(body.status, "ok");
  });

  it("should return health status on GET /readyz", async () => {
    const res = await request("/readyz");
    assert.strictEqual(res.statusCode, 200);
    const body = JSON.parse(res.body);
    assert.strictEqual(body.status, "ok");
  });

  it("should return Prometheus metrics on GET /metrics", async () => {
    const res = await request("/metrics");
    assert.strictEqual(res.statusCode, 200);
    assert.ok(res.body.includes("process_cpu_user_seconds_total"));
    assert.ok(res.headers["content-type"].includes("text/plain"));
  });

  it("should return 404 with trace ID for unknown routes", async () => {
    const res = await request("/nonexistent");
    assert.strictEqual(res.statusCode, 404);
    assert.ok(res.body.includes("Page not found"));
    assert.ok(res.body.includes("Trace ID:"));
  });
});
