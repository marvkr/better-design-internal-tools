import { describe, expect, test } from "bun:test";
import { flows } from "./flows";

describe("benchmark flow contract", () => {
  test("contains the complete initial backlog", () => {
    expect(flows).toHaveLength(15);
    expect(new Set(flows.map((flow) => flow.slug)).size).toBe(15);
  });

  test.each(flows)("$slug is a complete bounded flow", (flow) => {
    expect(flow.steps).toHaveLength(4);
    expect(flow.fields.length).toBeGreaterThanOrEqual(3);
    expect(flow.records.length).toBeGreaterThanOrEqual(3);
    expect(flow.job.endsWith(".")).toBe(true);
  });
});
