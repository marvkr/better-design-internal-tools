# Standalone benchmark safety

- Read and write only inside this standalone app. Do not inspect or modify parent or sibling directories.
- Drive the user's existing Chrome through its connected Chrome integration when browser evaluation is required.
- Never launch a separate browser, browser profile, headless browser, Playwright browser, or Puppeteer browser.
- If the existing Chrome integration is unavailable, record that exact limitation and leave browser-dependent checks incomplete.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
