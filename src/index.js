const express = require("express");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

try {
  const settings = yaml.load(
    fs.readFileSync(path.join(__dirname, "config/settings.yaml"), "utf8")
  );

  const port = process.env.PORT || settings.general.defaultPort || 3000;

  const app = express();
  app.get("/", (req, res) =>
    res.send(`Hello ${settings.general.welcomeName}!`)
  );
  app.listen(port, () => console.log(`App listening on port ${port}!`));
} catch (e) {
  console.error(e);
}
