import { describe, expect, test } from "bun:test";

const requiredFields = ["Workflow name", "Request channel", "Approver", "Reminder"];
const workflowSteps = ["Workflows", "Build the request", "Review workflow", "Workflow published"];

describe("team workflow configuration", () => {
  test("keeps the supplied workflow contract", () => {
    expect(requiredFields).toHaveLength(4);
    expect(workflowSteps.at(-1)).toBe("Workflow published");
  });
});
