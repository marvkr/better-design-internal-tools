import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "bun:test";

const root = join(import.meta.dir, "..");

function readJson<T>(file: string): T {
  return JSON.parse(readFileSync(join(root, file), "utf8")) as T;
}

test("Better Design receipts identify the generated project and assigned icons", () => {
  const designSystem = readJson<{
    baseSelection: { firstRankedId: string };
    generatedProject: { projectId: string; projectUrl: string; previewUrl: string };
    registry: { url: string; installCommand: string; iconLibraryAssignment: string };
  }>("benchmark/design-system.lock.json");
  const icons = readJson<{
    generatedProjectId: string;
    library: string;
    provider: string;
    manifestFile: string;
    componentFiles: string[];
  }>("benchmark/icons.lock.json");

  expect(designSystem.baseSelection.firstRankedId).toBe("slate");
  expect(designSystem.generatedProject.projectId).toBe(icons.generatedProjectId);
  expect(designSystem.registry.iconLibraryAssignment).toContain("Feather Icons");
  expect(icons.library).toBe("Feather Icons");
  expect(icons.provider).toBe("Iconify");
  expect(icons.manifestFile).toBe("src/components/icons/.library.json");
  expect(icons.componentFiles.length).toBeGreaterThan(0);
});
