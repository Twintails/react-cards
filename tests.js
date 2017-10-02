require("source-map-support").install()
const Jasmine = require("jasmine");

const tests = new Jasmine()

tests.loadConfig({
  spec_dir: "./build",
  spec_files: ["**/tests/*.js"]
})

tests.execute()
