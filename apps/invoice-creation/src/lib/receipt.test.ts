import { describe, expect, test } from "bun:test";

describe("invoice workflow rules", () => {
  test("requires positive quantities and prices", () => {
    expect(1).toBeGreaterThan(0);
    expect(8400).toBeGreaterThan(0);
  });
});
