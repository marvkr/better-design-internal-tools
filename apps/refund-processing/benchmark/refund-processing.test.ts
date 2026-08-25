import { expect, test } from "bun:test";
import fixture from "./fixture.json";

test("refund workflow keeps the configured four-step order", () => {
  expect(fixture.steps.map((step) => step.title)).toEqual([
    "Refund requests",
    "Order review",
    "Review refund",
    "Refund issued",
  ]);
  expect(fixture.fields.filter((field) => field.label !== "Internal note")).toHaveLength(4);
});
