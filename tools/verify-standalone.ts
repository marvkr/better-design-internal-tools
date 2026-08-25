import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

type Manifest = {
  appCount: number;
  apps: string[];
  model: string;
};

type SessionSettings = {
  model: string;
};

const STEPPER_HASH =
  "f80854f443750103b1cb693f995b3d03fb6487b3ff20a677a2725fc10862311b";
const STEPPER_FILE_COUNT = 14;
const checks = [
  ["frozen install", ["install", "--frozen-lockfile"]],
  ["typecheck", ["run", "typecheck"]],
  ["lint", ["run", "lint"]],
  ["build", ["run", "build"]],
] as const;

const toolsDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = dirname(toolsDirectory);
const manifest = JSON.parse(
  readFileSync(join(repositoryRoot, "benchmark", "standalone-apps.json"), "utf8"),
) as Manifest;

function digest(path: string) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function verifyAppSource(appDirectory: string, slug: string) {
  const componentDirectory = join(appDirectory, "src", "components", "ui");
  const mainComponent = join(componentDirectory, "ix-onboarding-stepper.tsx");
  const stepperFiles = readdirSync(componentDirectory).filter((file) =>
    file.startsWith("ix-onboarding-stepper"),
  );
  const settings = JSON.parse(
    readFileSync(join(appDirectory, "benchmark", "session-settings.json"), "utf8"),
  ) as SessionSettings;

  if (stepperFiles.length !== STEPPER_FILE_COUNT) {
    throw new Error(`${slug} has ${stepperFiles.length} Stepper files; expected ${STEPPER_FILE_COUNT}.`);
  }
  if (digest(mainComponent) !== STEPPER_HASH) {
    throw new Error(`${slug} does not contain the reviewed Stepper source.`);
  }
  if (settings.model !== manifest.model) {
    throw new Error(`${slug} uses ${settings.model}; expected ${manifest.model}.`);
  }
}

if (manifest.apps.length !== manifest.appCount) {
  throw new Error("The standalone app count does not match the manifest.");
}
if (existsSync(join(repositoryRoot, "apps", "issue-triage", "package.json"))) {
  throw new Error("The paused issue-triage treatment must stay excluded.");
}

for (const [index, slug] of manifest.apps.entries()) {
  const appDirectory = join(repositoryRoot, "apps", slug);
  verifyAppSource(appDirectory, slug);
  console.log(`\n[${index + 1}/${manifest.appCount}] ${slug}`);

  for (const [label, args] of checks) {
    console.log(`→ ${label}`);
    const result = spawnSync("bun", args, {
      cwd: appDirectory,
      env: process.env,
      stdio: "inherit",
    });
    if (result.error) throw result.error;
    if (result.status !== 0) {
      throw new Error(`${slug} failed during ${label}.`);
    }
  }
}

console.log(`\nVerified ${manifest.appCount} standalone Luna treatment apps.`);
