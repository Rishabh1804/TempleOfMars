<script lang="ts">
  import { aggregateCampaign, formatTokens, formatUsd } from '$lib/codex/aggregation';
  import type { Campaign, Session } from '$lib/types';

  interface Props { campaign: Campaign; sessions: Session[]; }
  let { campaign, sessions }: Props = $props();

  const agg = $derived(aggregateCampaign(campaign.id, sessions));
</script>

<section class="rounded-lg border-2 border-[var(--color-mars-red)] bg-[var(--color-mars-red)]/5 p-5">
  <h2 class="font-display text-lg uppercase tracking-wider text-[var(--color-mars-red)] mb-4">Campaign Telemetry</h2>
  <dl class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-sm">
    <div><dt class="text-xs uppercase text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">Sessions</dt><dd class="font-display font-bold text-xl text-[var(--color-mars-cyan)] tabular-nums">{agg.session_count}</dd></div>
    <div><dt class="text-xs uppercase text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">Tokens in</dt><dd class="font-display font-bold text-xl text-[var(--color-mars-cyan)] tabular-nums">{formatTokens(agg.tokens_in)}</dd></div>
    <div><dt class="text-xs uppercase text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">Tokens out</dt><dd class="font-display font-bold text-xl text-[var(--color-mars-cyan)] tabular-nums">{formatTokens(agg.tokens_out)}</dd></div>
    <div><dt class="text-xs uppercase text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">Total</dt><dd class="font-display font-bold text-xl text-[var(--color-mars-cyan)] tabular-nums">{formatTokens(agg.tokens_total)}</dd></div>
    <div><dt class="text-xs uppercase text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">Est. cost</dt><dd class="font-display font-bold text-xl text-[var(--color-mars-cyan)] tabular-nums">{formatUsd(agg.estimated_cost_usd)}</dd></div>
    <div><dt class="text-xs uppercase text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">Commits</dt><dd class="font-display font-bold text-xl text-[var(--color-mars-cyan)] tabular-nums">{agg.commits}</dd></div>
    <div><dt class="text-xs uppercase text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">LOC Δ</dt><dd class="font-display font-bold text-xl text-[var(--color-mars-cyan)] tabular-nums">{agg.loc_delta.toLocaleString()}</dd></div>
  </dl>
  {#if agg.session_count === 0}
    <p class="mt-4 text-xs italic text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">No session logs yet. Metrics will populate as <code>session_log</code> snippets land in Codex.</p>
  {:else}
    <p class="mt-4 text-xs text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)] tabular-nums">Efficiency (out/in): {agg.efficiency.toFixed(2)}×</p>
  {/if}
</section>
