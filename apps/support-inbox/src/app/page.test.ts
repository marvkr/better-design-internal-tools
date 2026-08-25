import { expect, test } from "bun:test";
import fixture from "../../benchmark/fixture.json";

test("support inbox fixture describes the complete triage workflow", () => {
  expect(fixture.steps).toHaveLength(4);
  expect(fixture.fields.filter((field) => field.type !== undefined)).toHaveLength(3);
  expect(fixture.steps.map((step) => step.action)).toEqual([
    "Open conversation",
    "Assign and reply",
    "Send response",
    "Next conversation",
  ]);
});
