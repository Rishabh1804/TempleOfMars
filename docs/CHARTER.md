# Temple of Mars — Charter

**Version:** v0.1 (pre-War-Time-Hour-0)
**Ratified:** pending (declared 2026-04-23 by Sovereign decree)
**Sister to:** Command Center (Monument, Book III)

---

## Purpose

Temple of Mars is the **Watchtower of the Order**: a read-only Progressive Web App that aggregates state across every active province and renders it as a single installable command-view surface.

Where the **Command Center** *directs* (decrees, handoffs, operational control), the **Temple** *observes* (state, telemetry, lore). The two form a complementary pair of Monument-class artifacts.

## Scope

In-scope:
- Campaign dashboards (War Time, Peacetime, Velocity Event, Scope Pivot)
- Per-province health + telemetry views
- Session-level aggregation of tokens, cost, wall-clock, commits, LOC
- Lore browser over Chronicles, Doctrines, Cautionary Tales
- Offline-capable, install-to-home-screen PWA surface

Out-of-scope:
- Any write to Codex or province repos (Edict III)
- Authentication flows, decree issuance, cabinet management (Command Center's remit)
- Real-time collaboration features (v0.x)
- Automated code analysis or CI orchestration (v0.x)

## Sovereign Decrees Establishing This Charter

1. **Stack choice:** SvelteKit + adapter-static + Tailwind v4 + @vite-pwa/sveltekit. First non-HTML PWA in the Order (deliberate break from the single-file province pattern). Doctrine-worthy: "When single-file HTML is insufficient, adopt Stack B."
2. **Builder seat:** Ignis. First project. Minister seat vacated. Canon entry to follow.
3. **Data source:** Live fetch from Codex JSON at `raw.githubusercontent.com/rishabh1804/Codex/main/data/*.json`. Codex is source-of-truth; Temple is subscriber.
4. **Capture mechanism:** Extension of Codex's existing snippet-import pipeline. New `session_log` snippet type adds Priority 1 + 2 telemetry fields to Session records. See [`SCHEMA.md`](./SCHEMA.md).
5. **Metrics (Priority 1 + 2):**
   - Sessions per task / phase / province
   - Tokens in + out per session, aggregated per phase/campaign
   - Model used, estimated USD cost (tokens × model rate)
   - Wall-clock duration per session
   - Commits per session (auto-derived)
   - LOC delta per session (auto-derived)
   - Efficiency ratio (output / input tokens)
6. **Fonts:** Playfair Display (display) + Work Sans (body). Inherited from Codex design system.
7. **Hosting:** GitHub Pages at `https://rishabh1804.github.io/templeofmars/`.

## Constitutional Positioning

| Edict | Temple stance |
|---|---|
| **I — 30K Rule** | MVP at ~3–6k LOC. Threshold distant. |
| **II — One Builder Per Repo** | Ignis. |
| **III — Sync Pipeline Authoritative** | Read-only by construction. Cannot bypass. |
| **IV — Dawn Page is a Hearth** | N/A for Temple. |
| **V — Capital Protection** | Temple holds no capital. |
| **VI — Monument Designation** | **Watchtower** sibling class proposed. Working Committee to formalize. |
| **VII — 15K Crystallization** | Distant. |
| **VIII — Charter Before Build** | This document, ratified before scaffold. |

## Governance

- **Builder:** Ignis — committer authority on app architecture
- **Censor:** TBD (Cluster assignment pending; leaning Cluster C or a new Watchtower cluster)
- **QA:** Cipher during campaign windows (per-merge reviews)
- **Recorder:** Aurelius (Chronicler) — Temple-related lore entries
- **Working Committee:** Formal Monument/Watchtower designation vote post-War-Time

## Roadmap

**v0.1 — MVP (shipping pre-Hour-0):**
- Scaffold, design system port, campaign dashboard, telemetry UI, Codex fetchers

**v0.2 — Post-War:**
- Lore browser (mdsvex content collections)
- Province detail views
- Peacetime view for idle periods

**v0.3 — Campaign Archive:**
- Historical War Times
- Post-war Working Committee review records
- Cross-campaign velocity trends

**v1.0 — Working-Committee-Ratified Monument:**
- Formal designation
- Integration with Command Center decree queue
- Full lore-graph browser

---

*This charter is a living document. Amendments follow Book V procedures; minor revisions by Builder authority.*
