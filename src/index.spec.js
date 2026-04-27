process.env.ENVK = "examples/.env";

import { strict as assert } from "node:assert";
import { afterEach, beforeEach, describe, it } from "node:test";
import fn from "./index.js";

const keys = ["HELLO", "HOLA", "CIAO", "EXPANDED"];

describe("envk", () => {
  beforeEach(() => {
    for (const key of keys) delete process.env[key];
  });

  afterEach(() => {
    for (const key of keys) delete process.env[key];
  });

  describe("entrypoint", () => {
    it("works", async () => {
      for (const key of keys) assert.strictEqual(key in process.env, false);
      await import("./autoload.js");
      assert.partialDeepStrictEqual(process.env, {
        HELLO: "world",
        HOLA: "mundo",
        CIAO: "mondo 😀",
        EXPANDED: "world-mundoimfineheresalut$done",
      });
    });
  });

  describe("fn", () => {
    it("works", async () => {
      for (const key of keys) assert.strictEqual(key in process.env, false);
      fn("./examples/.env");
      assert.partialDeepStrictEqual(process.env, {
        HELLO: "world",
        HOLA: "mundo",
        CIAO: "mondo 😀",
        EXPANDED: "world-mundoimfineheresalut$done",
      });
    });
  });
});
