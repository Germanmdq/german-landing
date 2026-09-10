# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

"Germán Asistente" is a standalone mobile PWA (independent from the "landing" project despite the folder name). First delivery: an interactive welcome flow and a demo interest selection. No Supabase auth or active workshops yet; no personal data is stored. See `PROJECT_MAP.md` for the full screen flow (mermaid diagram) and `ANIMATION_PLAN.md` for the animation system and planned dotLottie pieces.

## Commands

```
pnpm dev        # next dev -p 3020  — app runs at http://localhost:3020
pnpm build      # next build (static export, see next.config.ts: output: 'export')
pnpm start      # next start -p 3020
pnpm typecheck  # tsc --noEmit
```

No lint or test scripts are configured (no ESLint config, no test runner in this repo). `pnpm typecheck` is the only automated check — run it after changes.

Package manager is `pnpm` (see `pnpm-lock.yaml` / `pnpm-workspace.yaml`); don't use npm/yarn lockfiles. First-time install on a machine without Node may require approving `sharp`'s build script: `pnpm approve-builds --all`.

## Architecture

- **Single-page screen machine, not routed pages.** Nearly the entire app lives in `app/page.tsx` (~565 lines): it holds the map of screens, cards, internal menus, and navigation as client-side state, not Next.js routes. Read this file first for any UI change.
- **Static export target.** `next.config.ts` sets `output: 'export'` — the app is built to static files (see `out/` per `PROJECT_MAP.md`), not deployed as a Next server. Avoid server-only features (route handlers, server actions) that don't survive static export.
- **Content pipeline is generated, not hand-written.** `scripts/generate-content.mjs` parses a master text document (7-day plans for amor/dinero/salud + 15 "meditations for now") and writes `app/content.generated.json`, which the app reads at runtime. To change plan/meditation copy, edit the source document and rerun the script — don't hand-edit `content.generated.json`.
- **Styling is a set of hand-authored CSS files, no Tailwind/CSS-in-JS**: `app/globals.css`, `app/magic-ui.css` (card/mount/library/player/form system, "Magic UI"-inspired), `app/animation.css`, `app/brain.css`, `app/german-entry.css`, plus per-component CSS (`app/components/day-one-carousel.css`). Reusable visual primitives (Magic Card, Shimmer Button, Border Beam) live in `app/components/magic-ui.tsx`.
- **Supabase** (`app/lib/supabase.ts`) is used only for published talks/lectures content (`content_items` + `content_assets` tables) — not for auth or user data. Falls back to hardcoded project URL/key if env vars are absent; real config goes in `.env.example`-shaped `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`).
- **Day 1 carousel** (`app/components/day-one-carousel.tsx`) is a one-off component reverse-engineered from Apple's mac-mini page carousel (measurements/timings documented in `docs/apple-day-one-reference.md`). It is scoped to the "Día 1" node only — other days/screens keep their original implementation; don't generalize it without reading that doc first.

## Product rules to preserve (from PROJECT_MAP.md / ANIMATION_PLAN.md)

- Every screen has a fixed header and a visible back button; two cards are shown at a time, with the lower card sliding up to mount over the upper one.
- No fake stats, dates, audio counts, or quantities are ever displayed.
- Animation is short, functional, and touch-driven — never decorative for its own sake, and no continuously blinking/looping UI. Illustrated pieces are meant to move to dotLottie (`public/animations/*.lottie`); interface navigation stays React/CSS.
- Germán is drawn as a single consistent cartoon in circular frames (never oval).
