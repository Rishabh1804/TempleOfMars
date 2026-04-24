<script lang="ts">
  import { aggregatePhase, formatTokens, formatUsd } from '$lib/codex/aggregation';
  import type { Phase, Session } from '$lib/types';

  interface Props {
    province: 'sproutlab' | 'sep-dashboard' | 'sep-invoicing';
    phases: Phase[];
    sessions: Session[];
    size_label?: string;
  }
  let { province, phases, sessions, size_label }: Props = $props();

  const provinceColor = {
    sproutlab: 'var(--color-province-sproutlab)',
    'sep-dashboard': 'var(--color-province-dashboard)',
    'sep-invoicing': 'var(--color-province-invoicing)'
  }[province];

  const display = {
    sproutlab: 'SproutLab',
    'sep-dashboard': 'SEP Dashboard',
    'sep-invoicing': 'SEP Invoicing'
  }[province];

  const aggregates = $derived(phases.map((p) => ({ phase: p, agg: aggregatePhase(p.id, sessions) })));

  const totals = $derived(
    aggregates.reduce(
      (acc, { agg }) => ({
        sessions: acc.sessions + agg.session_count,
        tokens: acc.tokens + agg.tokens_total,
        cost: acc.cost + agg.estimated_cost_usd,
        commits: acc.commits + agg.commits,
        loc: acc.loc + agg.loc_delta
      }),
      { sessions: 0, tokens: 0, cost: 0, commits: 0, loc: 0 }
    )
  );

  const leads = $derived([...new Set(phases.flatMap((p) => p.leads))].join(', '));
</script>

<article
  class="rounded-lg border-2 border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-white/80 dark:bg-black/30 p-5 backdrop-blur"
  style="border-left-width: 6px; border-left-color: {provinceColor}"
>
  <header class="mb-3">
    <h3 class="font-display text-xl flex items-center gap-2">
      <span class="inline-block w-3 h-3 rounded-sm" style="background: {provinceColor}"></span>
      {display}
    </h3>
    <div class="text-xs text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)] mt-1 capitalize">
      Lead{phases.flatMap((p) => p.leads).length > 1 ? 's' : ''}: {leads}
      {#if size_label}· {size_label}{/if}
    </div>
  </header>

  <dl class="grid grid-cols-2 gap-2 mb-4 text-sm">
    <div class="rounded bg-black/5 dark:bg-white/5 p-2">
      <dt class="text-xs text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">Sessions</dt>
      <dd class="font-display font-bold text-[var(--color-mars-cyan)] tabular-nums">{totals.sessions}</dd>
    </div>
    <div class="rounded bg-black/5 dark:bg-white/5 p-2">
      <dt class="text-xs text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">Tokens</dt>
      <dd class="font-display font-bold text-[var(--color-mars-cyan)] tabular-nums">{formatTokens(totals.tokens)}</dd>
    </div>
    <div class="rounded bg-black/5 dark:bg-white/5 p-2">
      <dt class="text-xs text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">Est. cost</dt>
      <dd class="font-display font-bold text-[var(--color-mars-cyan)] tabular-nums">{formatUsd(totals.cost)}</dd>
    </div>
    <div class="rounded bg-black/5 dark:bg-white/5 p-2">
      <dt class="text-xs text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">Commits / LOC</dt>
      <dd class="font-display font-bold text-[var(--color-mars-cyan)] tabular-nums">{totals.commits} / {totals.loc.toLocaleString()}</dd>
    </div>
  </dl>

  <ol class="space-y-2">
    {#each aggregates as { phase, agg } (phase.id)}
      <li class="rounded border-l-2 border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-2.5">
        <div class="flex items-baseline justify-between gap-2">
          <div class="font-medium text-sm">{phase.name}</div>
          <div class="text-xs text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)] tabular-nums shrink-0">
            H{phase.hours[0]}–H{phase.hours[1]}
          </div>
        </div>
        {#if agg.session_count > 0}
          <div class="mt-1 text-xs text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)] tabular-nums">
            {agg.session_count} sessions · {formatTokens(agg.tokens_total)} tokens · {formatUsd(agg.estimated_cost_usd)}
          </div>
        {:else}
          <div class="mt-1 text-xs text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)] italic">No sessions logged yet</div>
        {/if}
      </li>
    {/each}
  </ol>
</article>
