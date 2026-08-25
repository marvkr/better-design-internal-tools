import { expect, test } from "bun:test";

const fixture = await Bun.file("benchmark/fixture.json").json();

test("fixture defines the complete publishing workflow", () => {
  expect(fixture.steps.map((step: { title: string }) => step.title)).toEqual([
    "Automations",
    "Choose trigger and action",
    "Review test data",
    "Automation published",
  ]);
  expect(fixture.fields.map((field: { label: string }) => field.label)).toEqual([
    "Automation name",
    "Trigger app",
    "Trigger event",
    "Action",
  ]);
});
