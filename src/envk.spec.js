process.env.ENVK = "examples/.env";

const { strict: assert } = require("node:assert");
const envk = require("./envk.js");

it("works", () => {
  const result = envk();

  assert.equal(result.HELLO, "world");
  assert.equal(result.HOLA, "mundo");
  assert.equal(result.CIAO, "mondo 😀");
  assert.equal(result.EXPANDED, "world-mundoimfineheresalut$done");
});
