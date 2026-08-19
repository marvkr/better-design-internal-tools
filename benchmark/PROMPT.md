# Shared benchmark prompt

Build the internal-tool flow named below as a responsive React web interface.

Requirements:

- Implement every step defined in `src/benchmark/flows.ts`.
- Use the supplied product name, navigation, records, fields, and copy.
- Keep all actions usable with keyboard and touch input.
- Preserve visible focus, semantic labels, and reduced-motion support.
- Do not use UX Corpus screenshots, third-party branding, or copied assets.
- Do not change dependencies, fixtures, tests, or the build budget.

The benchmark runner appends the selected flow's `name`, `audience`, `job`, and
step definitions to this prompt. The before and after sessions receive the same
completed prompt. Only the after session receives Better Design MCP access.
