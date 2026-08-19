# Better Design internal tools

Fifteen open-source internal-tool flows built by an AI coding agent with the
Better Design MCP. Each flow is a bounded, responsive workflow with four
screens: overview, input, review, and completion.

This repository is the public **after** side of a controlled before-and-after
benchmark. The private baseline receives the same prompt, fixtures,
dependencies, and time budget. Only this build receives Better Design MCP
guidance, generated or selected design systems, review rules, and icons.

## Flows

1. Issue triage
2. Invoice creation
3. CRM workflow publishing
4. Support inbox triage
5. Internal meeting scheduling
6. Newsletter creation
7. Project deployment
8. Intake form creation
9. Automation publishing
10. Funnel-report creation
11. Agreement review and signing
12. Employee onboarding
13. Refund processing
14. Team workflow creation
15. Internal page publishing

## Run locally

    bun install
    bun dev

Open http://localhost:3000. The catalog links to every flow.

## Verify

    bun test
    bun run typecheck
    bun run lint
    bun run build

The shared prompt is in benchmark/PROMPT.md. The MCP systems and public
previews are recorded in benchmark/DESIGN-SYSTEMS.md. Use
benchmark/RUBRIC.md for blind comparison.

The UX screenshot corpus informed which common workflows to benchmark. Corpus
screens, product branding, and copied assets are not included in either build.

## License

MIT
