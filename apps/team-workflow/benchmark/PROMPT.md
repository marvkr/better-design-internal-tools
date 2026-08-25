# Standalone internal-tool build

Build the internal-tool workflow defined in `benchmark/fixture.json` as a
production-quality responsive React application.

The repository is a complete, standalone Next.js, TypeScript, Tailwind CSS,
and standard shadcn project. Use the supplied shadcn components. Do not import
code from outside this repository and do not inspect any sibling or comparison
application.

Requirements:

- Implement all four workflow steps in the supplied order.
- Use the supplied product name, navigation, statistics, records, fields, copy,
  and actions.
- Make the primary task work end to end: overview, data entry, review, and
  completion.
- Require every configured field, show a clear validation error, and move focus
  to the first invalid field.
- Preserve entered values when moving backward and forward.
- Include an optional internal note and preserve it through review.
- Provide a reset action after completion.
- Support keyboard and touch input, visible focus, semantic labels, reduced
  motion, and WCAG AA contrast.
- Work without horizontal overflow at 390x844, 768x1024, and 1440x1000.
- Keep touch targets at least 44px while the mobile or tablet shell is active.
- Keep form text at least 16px below the desktop breakpoint.
- Use realistic interface copy. Do not add filler marketing sections.
- Do not use UX Corpus screenshots, third-party branding, copied assets, or an
  existing comparison implementation.
- Do not change `benchmark/fixture.json`, `benchmark/acceptance.json`, package
  versions, `benchmark/session-settings.json`, or the build budget.
- Run typecheck, lint, tests, and a production build before finishing.

Write a short implementation receipt to `benchmark/evidence.json`. Record the
commands you ran, their outcomes, files changed, any tool limitation, and the
actual agent-session settings. Do not claim a tool or setting was used unless
it was actually used.


# Better Design MCP treatment

Use the Better Design MCP before writing feature UI. This run is valid only
when it installs a newly generated Better Design project and uses the icon
library assigned to that same project.

1. Load relevant UI and UX principles.
2. Find design systems for this exact product and workflow. Select the first
   ranked result without asking for a human choice and record it as the base.
3. Call `create-design-system` with that base system ID and a prompt derived
   only from this app's supplied product, workflow, and fixture. Record the
   returned project ID and project URL.
4. Poll `get-design-system-status` until the project is complete. Run the
   generated project's shadcn registry install command inside this repository.
   Do not install the base catalog kit as a substitute.
5. Read the generated registry's `meta.iconLibrary` assignment. Install every
   required icon from that exact library as owned React components. Do not
   independently choose a different library and do not keep Lucide imports.
6. Build with the generated tokens and components rather than recreating the
   design system by hand.
7. Load the MCP review rules and comprehension check after implementation and
   fix every critical or serious finding.
8. Measure the rendered result with `inspect-spacing` at 1440, 1728 and 390
   wide. The first call returns a capture script and measures nothing. Run the
   script in a browser and call the tool again with the captured states; the run
   is measured only when that call returns status `completed`. Record that
   result. Rules read source and copy; only measurement catches a label sitting
   off its own circle centre, an active state wider than its siblings that
   shifts the row, or a sidebar that leaves page background beside it. Fix every
   misalignment you measure.
9. Wire every control before you finish. Each nav item, link, tab, button and
   logo needs a handler or an href, and clicking it must change something. A
   styled `<li>` is not navigation. Verify each one in a real browser.

Save verifiable receipts:

- `benchmark/design-system.lock.json`: first-ranked base, generated project ID,
  project and preview URLs, generated registry URL and install command, the
  registry's icon assignment, MCP operations, and installed files.
- `benchmark/icons.lock.json`: the same generated project ID, assignment source,
  library, provider, variant, installed icon names, manifest, and component files.
- `benchmark/evidence.json`: ordered Better Design MCP operations and all local
  verification commands.

If `create-design-system`, generation, the generated registry install, or the
assigned icon install fails, record the exact failure and stop. The run does
not count. Do not substitute handmade tokens, a catalog kit, a generic shadcn
theme, or another icon library.
