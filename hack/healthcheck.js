/**
 * In order to check the health of a container, Docker would need to run the following command:
 * curl --fail http://localhost:3000/livez
 * However, this app may be mounted in an image which doesn't have curl installed (ie. distroless)
 * This script does the same as the above command but doesn't require an external binary to perform the health check
 */

require("http")
  .request(
    {
      host: "localhost",
      port: process.env.PORT || 3000,
      timeout: 2000,
      path: "/livez",
    },
    (res) => process.exit(res.statusCode != 200)
  )
  .end();
