import { describe, expect, test } from "bun:test";

type Details = { candidate: string; type: string; duration: string; date: string };

function firstMissing(details: Details) {
  return (["candidate", "type", "duration", "date"] as const).find((field) => !details[field].trim());
}

describe("meeting scheduling workflow", () => {
  test("requires fields in fixture order", () => {
    expect(firstMissing({ candidate: "", type: "", duration: "", date: "" })).toBe("candidate");
    expect(firstMissing({ candidate: "Jamie Park", type: "", duration: "", date: "" })).toBe("type");
    expect(firstMissing({ candidate: "Jamie Park", type: "Panel interview", duration: "60 minutes", date: "2026-08-24" })).toBeUndefined();
  });
});
