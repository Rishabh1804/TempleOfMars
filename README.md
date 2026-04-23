# Temple of Mars

**Watchtower of the Order. Sister Monument to the Command Center.**

A Progressive Web App that aggregates live state from across the Republic of Codex — Codex itself, SproutLab, SEP Dashboard, SEP Invoicing, and the Command Center — into a single installable surface. Where the Command Center directs, the Temple observes and remembers.

> *"Every discovery becomes lore. Every pattern becomes doctrine. Every decision is chronicled."* — Pillar I

---

## What This Is

A read-only command-view PWA serving three purposes, in priority order:

1. **Campaign Dashboard** — live status of the current campaign (War Time, Peacetime, or idle). First campaign: War Time 2026-04-24 → 2026-04-27.
2. **Province Watchtower** — aggregate health, velocity, and telemetry across the four active provinces (SproutLab, SEP Dashboard, SEP Invoicing, Codex itself) plus the Monument (Command Center).
3. **Lore Browser** — searchable, filterable view over Chronicles, Doctrines, and Cautionary Tales.

Temple does not mutate state. Writes happen in the provinces; Temple only observes. Edict III (Sync Pipeline Authoritative) enforced by construction: Temple ships no write credentials.

## Order Positioning

| Command Center | Temple of Mars |
|---|---|
| Writes decrees | Reads state |
| Operational tool | Situational-awareness surface |
| Single-file HTML PWA | Modern-toolchain PWA (SvelteKit) |
| Monument (Book III) | Watchtower (proposed, sibling class) |

**Builder:** Ignis (first project; Minister seat vacated per Sovereign decree 2026-04-23 — canon entry to follow).

## Install

Once deployed:

- **Desktop (Chrome/Edge):** visit `https://rishabh1804.github.io/templeofmars/` → install icon in the address bar.
- **iOS Safari:** Share → *Add to Home Screen*.
- **Android Chrome:** menu → *Install app*.

Offline-capable: last-known state served from the Service Worker cache; updates in the background when Codex data changes.

## What It Watches

| Source | What Temple displays |
|---|---|
| **Codex** — `data/canons.json`, `data/journal.json`, `data/volumes.json`, `data/campaigns.json` | Active canons, session chronicles, volume health, campaign state |
| **SproutLab** | Build stats, sync status, Phase progression |
| **SEP Dashboard** | v2.1 baseline integrity, Session 8 progress |
| **SEP Invoicing** | Phase 1/2 merge state, Margin Dashboard status |
| **Command Center** | Decree queue depth, active campaign |

All data fetched live from raw GitHub content URLs. Codex JSON is the authoritative public contract; Temple is a subscriber, not a source-of-truth.

## Campaign Telemetry

For each active campaign (War Time first), Temple aggregates session-level metrics. See [`docs/SCHEMA.md`](./docs/SCHEMA.md) for full detail.

**Priority 1 (core):**
- Sessions per task, per phase, per province
- Tokens in + tokens out per session, aggregated per phase
- Model used (Opus / Sonnet / Haiku) — cost-weighted
- Estimated $ per session / phase (computed from tokens × model rate)

**Priority 2 (velocity):**
- Wall-clock duration per session
- Commits per session (auto-derived from git)
- LOC delta per session (auto-derived)
- Token efficiency ratio (output / input)

Data captured via Codex's existing snippet-import pipeline — a new `session_log` snippet type. Builders end each session by pasting a JSON snippet into Codex; Temple reads and renders.

## Architecture

Static-compiled SvelteKit app served from GitHub Pages.

```
├── src/
│   ├── routes/              ← File-based routing
│   │   ├── +layout.svelte   ← Shell, header, theme toggle
│   │   └── +page.svelte     ← Campaign dashboard (home)
│   ├── lib/
│   │   ├── codex/           ← Codex JSON fetchers + aggregation
│   │   ├── components/      ← Reusable Svelte components
│   │   ├── stores/          ← Theme, fs-base, clock, campaign
│   │   ├── constants/       ← Pricing, design tokens
│   │   ├── data/            ← Seed campaign data (War Time 2026-04-24)
│   │   └── types/           ← TypeScript contracts
│   ├── app.html             ← Shell
│   ├── app.css              ← Tailwind v4 @theme + design tokens
│   └── hooks.client.ts      ← Theme init, FS-base init
├── static/                  ← manifest, icons, .nojekyll
├── docs/                    ← CHARTER, SCHEMA
├── svelte.config.js         ← adapter-static, base: '/templeofmars/'
├── vite.config.ts           ← @vite-pwa/sveltekit + Tailwind v4
└── .github/workflows/       ← deploy.yml
```

### Stack

| Layer | Choice |
|---|---|
| Framework | SvelteKit 2.x (Svelte 5 runes) + `adapter-static` |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 (CSS-first `@theme`) |
| PWA | `@vite-pwa/sveltekit` (Workbox) |
| Tooling | pnpm + Biome + Vitest |
| Hosting | GitHub Pages via Actions |

### Design System (ported from Codex)

| Token | Value |
|---|---|
| Display font | Playfair Display (serif) |
| Body font | Work Sans (sans-serif) |
| Text size | `--fs-base` slider (12 / 14 / 17px) |
| Theme | Light/dark toggle, `.dark` on `:root` |
| Icons | Stroke-1.5 SVG via `<Icon name="..." />` |

## Constitutional Alignment

- **Pillar I (Nothing Is Wasted)** — every lore entry is a committed markdown file; every session is a committed snippet. No ephemeral state.
- **Pillar II (Map ≠ Territory)** — Codex JSON is territory; Temple is the map. Read-only by construction.
- **Pillar III (Growth Is Fractal)** — file-based routing + content collections. New views = new files.
- **Pillar IV (Territory Is Earned and Held)** — `adapter-static` produces a pinned, reproducible artifact.
- **Edict III (Sync Pipeline Authoritative)** — Temple subscribes, never bypasses.
- **Edict VI (Monument Designation)** — Watchtower sibling class proposed; Working Committee to formalize.
- **Edict VIII (Charter Before Build)** — `CHARTER.md` drafted alongside this README.
- **Canon 0034 (SWs never cache HTML)** — `@vite-pwa/sveltekit` configured with `globIgnores: ['**/*.html']`.

## Development

```bash
pnpm install
pnpm dev        # local dev server
pnpm build      # static build → build/
pnpm preview    # preview built output
pnpm check      # type check
pnpm test       # unit tests
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml` → builds and publishes to GitHub Pages.

## Related Repos

| Repo | Relation |
|---|---|
| [Codex](https://github.com/rishabh1804/Codex) | Source-of-truth for doctrine, lore, volume + campaign state |
| [Command-Center](https://github.com/rishabh1804/Command-Center) | Sister Monument; directs what Temple observes |
| [SproutLab](https://github.com/rishabh1804/sproutlab) | Province (Cluster A) |
| [sep-dashboard](https://github.com/rishabh1804/sep-dashboard) | Province (Cluster B) |
| [sep-invoicing](https://github.com/rishabh1804/sep-invoicing) | Province (Cluster B) |

## Status

**v0.1 — MVP scaffold (pre-War-Time-Hour-0)**

- [x] Repo scaffold (SvelteKit + Tailwind v4 + PWA)
- [x] Design system port (Playfair + Work Sans, theme, fs-base)
- [x] Campaign dashboard (War Time view, countdown, provinces, timeline, checkpoints)
- [x] Codex fetchers + telemetry UI (renders when Codex `campaigns.json` lands)
- [x] GH Pages deploy via Actions
- [ ] Lore browser (v0.2, post-War)
- [ ] Peacetime view (v0.2, post-War)

## License

Private archive. All rights reserved to The Architect. Not for external redistribution.

---

*Temple of Mars is a sister Monument to the Command Center within the Republic of Codex. It observes; it does not direct.*
