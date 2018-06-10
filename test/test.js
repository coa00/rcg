const rcg = require("../lib/");
const path = require("path");

it("error check", () => {
  rcg("test", path.join(__dirname, "template.temp"), undefined, { dest: "./test/output", prefix:"a", debug: true });
});