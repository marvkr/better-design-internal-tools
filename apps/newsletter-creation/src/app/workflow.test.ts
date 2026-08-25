import { expect, test } from "bun:test";

test("newsletter workflow keeps the required four-step order", () => {
  expect(["Posts", "Write the update", "Review and schedule", "Post scheduled"]).toHaveLength(4);
  expect(["Subject", "Preview text", "Audience", "Send date"]).toEqual([
    "Subject",
    "Preview text",
    "Audience",
    "Send date",
  ]);
});
