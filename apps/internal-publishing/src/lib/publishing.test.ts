import { describe, expect, test } from "bun:test";
import { validatePageValues } from "./publishing";

describe("validatePageValues", () => {
  test("requires every configured field but allows the internal note to be empty", () => {
    expect(validatePageValues({ title: "", collection: "", owner: "", reviewDate: "", note: "" })).toEqual({
      title: "Enter a page title.",
      collection: "Choose a collection.",
      owner: "Choose an owner.",
      reviewDate: "Choose a review date.",
    });
  });

  test("accepts a complete page with an optional note", () => {
    expect(validatePageValues({ title: "Expense policy", collection: "Finance handbook", owner: "Finance operations", reviewDate: "2026-09-01", note: "Review with legal" })).toEqual({});
  });
});
