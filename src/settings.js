const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

try {
  const settings = yaml.load(fs.readFileSync(path.join(__dirname, "config/settings.yaml"), "utf8"));
  exports.settings = settings;
} catch (e) {
  console.error(e);
}
