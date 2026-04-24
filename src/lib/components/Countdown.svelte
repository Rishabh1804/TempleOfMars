<script lang="ts">
  import { now, computeCountdown } from '$lib/stores/clock';

  interface Props { started_at: string; ends_at: string; }
  let { started_at, ends_at }: Props = $props();

  const countdown = $derived(computeCountdown($now, started_at, ends_at));
  const label = $derived(
    countdown.label === 'until-start' ? 'Begins in' :
    countdown.label === 'in-progress' ? 'Time remaining' : 'Expired'
  );
  const pad = (n: number) => n.toString().padStart(2, '0');
</script>

<div class="rounded-lg border border-[var(--color-mars-red)] bg-[var(--color-mars-red)]/10 p-5">
  <div class="text-xs uppercase tracking-wider text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)] mb-2">{label}</div>
  {#if countdown.label === 'expired'}
    <div class="font-display text-3xl text-[var(--color-mars-red)]">Campaign expired</div>
  {:else}
    <div class="font-display text-3xl md:text-4xl text-[var(--color-mars-cyan)] tabular-nums">
      {countdown.days}d {pad(countdown.hours)}h {pad(countdown.minutes)}m <span class="text-2xl opacity-70">{pad(countdown.seconds)}s</span>
    </div>
  {/if}
  {#if countdown.label === 'in-progress'}
    <div class="mt-3 h-2 rounded-full bg-black/30 overflow-hidden">
      <div class="h-full bg-gradient-to-r from-[var(--color-province-sproutlab)] via-[var(--color-province-dashboard)] to-[var(--color-province-invoicing)] transition-[width] duration-1000" style="width: {countdown.progress_pct}%"></div>
    </div>
    <div class="mt-1 text-xs text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)] tabular-nums">{countdown.progress_pct.toFixed(1)}% elapsed</div>
  {/if}
</div>
