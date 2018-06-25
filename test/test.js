const tcg = require("../lib/");
const path = require("path");

it("error check", () => {
  tcg("test", path.join(__dirname, "${name.pascalCase}.temp"), undefined, { dest: "./test/output", prefix:"a", debug: true });
});