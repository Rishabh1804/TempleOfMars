# Temple of Mars — Schema Contracts

Temple reads from Codex. This document specifies the data contracts that link them.

All types live in [`src/lib/types/index.ts`](../src/lib/types/index.ts). Codex changes to these shapes are breaking changes for Temple.

---

## Codex files Temple reads

| File | Purpose |
|---|---|
| `data/campaigns.json` | Campaign definitions (War Time, Peacetime, etc.) with phases + tasks |
| `data/journal.json` | Session records (extended with campaign fields) |
| `data/canons.json` | Canon ledger (future: lore browser) |
| `data/volumes.json` | Volume state (future: province detail views) |

All fetched from `https://raw.githubusercontent.com/rishabh1804/Codex/main/<path>`.

## Campaign schema (`campaigns.json`)

See Codex [`data/campaigns.json`](https://github.com/Rishabh1804/Codex/blob/main/data/campaigns.json) for the current authoritative structure. Shape mirrored in [`src/lib/types/index.ts`](../src/lib/types/index.ts) as `Campaign`.

## Extended Session schema (`journal.json`)

Existing fields (unchanged): `id`, `summary`, `volumes_touched[]`, `decisions[]`, `bugs_found`, `handoff`.

**New fields for campaign telemetry (all optional):**

- `campaign_id`, `phase_id`, `task_id` — linkage
- `builder`, `province`
- `started_at`, `ended_at` (ISO)
- `model` (opus-4-7 | opus-4-6 | sonnet-4-6 | haiku-4-5 | other)
- `tokens_in`, `tokens_out`
- `commits[]`, `loc_delta`
- `lore_generated[]`

Existing sessions without these fields render as zero-contribution in campaign aggregates.

## `session_log` snippet type

Codex already accepts snippets of the form:

```json
{ "snippet_type": "...", "operations": [{ "op": "...", "data": { } }] }
```

Temple defines `snippet_type: "session_log"` with three operations:

### `record_session`

Records a full session with telemetry.

```jsonc
{
  "snippet_type": "session_log",
  "operations": [{
    "op": "record_session",
    "data": {
      "id": "session-2026-04-24-lyra-01",
      "campaign_id": "war-time-2026-04-24",
      "phase_id": "sproutlab-phase-1",
      "task_id": "sl-1-2",
      "builder": "lyra",
      "province": "sproutlab",
      "started_at": "2026-04-24T02:30:00Z",
      "ended_at": "2026-04-24T04:15:00Z",
      "model": "opus-4-7",
      "tokens_in": 125000,
      "tokens_out": 18500,
      "commits": ["abc1234", "def5678"],
      "loc_delta": 234,
      "summary": "Connection indicator implemented and merged",
      "decisions": ["Use localStorage to persist last-seen-online timestamp"],
      "bugs_found": 0,
      "lore_generated": []
    }
  }]
}
```

### `update_task_status`

Advances a task's `status` (pending | in-progress | review | complete | blocked).

### `log_blocker`

Optional Priority 3 capture for post-war Cautionary Tale synthesis.

## Pricing table

See [`src/lib/constants/pricing.ts`](../src/lib/constants/pricing.ts). USD per 1M tokens. Reconcile quarterly.

| Model | Input | Output |
|---|---|---|
| opus-4-7 | 15 | 75 |
| opus-4-6 | 15 | 75 |
| sonnet-4-6 | 3 | 15 |
| haiku-4-5 | 1 | 5 |

## Aggregation contracts

- `aggregatePhase(phase_id, sessions)` → `PhaseAggregate`
- `aggregateCampaign(campaign_id, sessions)` → similar shape at campaign scope

See [`src/lib/codex/aggregation.ts`](../src/lib/codex/aggregation.ts).

## Backwards compatibility

- Sessions without campaign fields → zero-contribution in aggregates.
- Missing `campaigns.json` → falls back to seed data, UI marks source as `seed`.
- Missing `journal.json` → empty-state message.

No hard failure paths. Temple degrades gracefully when Codex is unreachable.
