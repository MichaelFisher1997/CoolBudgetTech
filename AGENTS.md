AGENTS

Build/run
- Dev: bun run dev (Astro dev server)
- Build: bun run build (Astro static build)
- Preview: bun run preview
- No test/lint configured; if adding, prefer Vitest and Biome. Single test: bunx vitest run path/to.test.ts -t "test name"

Package/runtime
- Bun runtime supported; ESM only (type: module). Use import/export.
- Use Astro 5, Tailwind 4, Nanostores; avoid introducing new libs without approval

Code style
- Formatting: 2 spaces, Prettier defaults; if adding formatter, use Biome or Prettier
- Imports: absolute from src when configured; prefer type-only imports (import type X)
- Types: TypeScript strict; avoid any; use explicit return types for exported functions
- Naming: camelCase for vars/functions, PascalCase for components, SCREAMING_SNAKE_CASE for env
- Components: .astro for pages/components; colocate styles; keep props typed via Astro Props
- State: use nanostores in src/lib/stores.ts; keep stores minimal and serializable
- Errors: fail fast; throw Error with message; don't swallow exceptions; return Result-like objects for recoverable flows
- Async: prefer async/await; handle promise rejections; no floating promises
- Accessibility/SEO: alt text, labels, metadata, sitemap/robots preserved

Testing (if added)
- Use Vitest + @testing-library/dom; run with bunx vitest; colocate .test.ts(x)

Tools
- No Cursor/Copilot rules found; none to inherit
- Before committing, run build locally and check for type errors
