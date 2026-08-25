# Better Design internal tools

Fourteen open-source internal-tool flows built by an AI coding agent with the
Better Design MCP. Each app is a standalone, responsive four-step workflow
with working interactions and realistic content.

This repository is the public **after** side of a controlled before-and-after
benchmark. The private baseline receives the same prompt, fixtures,
dependencies, and time budget. Only this build receives Better Design MCP
guidance, generated or selected design systems, review rules, and icons.

## Standalone apps

1. Agreement review and signing
2. Automation publishing
3. CRM workflow publishing
4. Employee onboarding
5. Funnel-report creation
6. Intake form creation
7. Internal page publishing
8. Invoice creation
9. Internal meeting scheduling
10. Newsletter creation
11. Project deployment
12. Refund processing
13. Support inbox triage
14. Team workflow creation

The Luna issue-triage treatment is paused and is not part of this release. Its
placeholder remains under `apps/issue-triage`; no older treatment was
substituted.

## Run locally

    cd apps/agreement-signing
    bun install --frozen-lockfile
    bun dev

Open http://localhost:3000. Replace `agreement-signing` with any listed app.

## Verify

    bun run verify:standalone

Each app keeps its prompt, fixture, session settings, design-system receipt,
and review evidence under its own `benchmark` directory. The shared Stepper
integration receipt is in `benchmark/STEPPER.md`. Use
`benchmark/RUBRIC.md` for blind comparison.

The UX screenshot corpus informed which common workflows to benchmark. Corpus
screens, product branding, and copied assets are not included in either build.

## License

MIT
