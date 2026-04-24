<script lang="ts">
  import CampaignSummary from '$lib/components/CampaignSummary.svelte';
  import Checkpoint from '$lib/components/Checkpoint.svelte';
  import Countdown from '$lib/components/Countdown.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import LoreSchema from '$lib/components/LoreSchema.svelte';
  import ProvinceCard from '$lib/components/ProvinceCard.svelte';
  import Timeline from '$lib/components/Timeline.svelte';
  import { campaignStore } from '$lib/stores/campaign';

  const campaign = $derived($campaignStore.campaign);
  const sessions = $derived($campaignStore.sessions);

  const phasesByProvince = $derived(
    Object.fromEntries(
      campaign.provinces.map((p) => [p, campaign.phases.filter((ph) => ph.province === p)])
    )
  );

  const sizeLabels: Record<string, string> = {
    sproutlab: '~62k LOC',
    'sep-dashboard': '~4.5k LOC',
    'sep-invoicing': '~7.4k LOC'
  };

  function formatStart(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleString('en-GB', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric', month: 'short', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false
    }) + ' IST';
  }
</script>

<div class="space-y-8">
  <section class="space-y-4">
    <div class="flex flex-wrap items-baseline justify-between gap-2">
      <h2 class="font-display text-2xl">{campaign.title}</h2>
      <span class="text-xs uppercase tracking-wider text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">
        Data: {$campaignStore.source === 'codex' ? 'Codex (live)' : 'Seed (fallback)'}
        {#if $campaignStore.last_fetched}· updated {$campaignStore.last_fetched.toLocaleTimeString()}{/if}
      </span>
    </div>

    <Countdown started_at={campaign.started_at} ends_at={campaign.ends_at} />

    <dl class="grid gap-3 grid-cols-2 md:grid-cols-4">
      <div class="rounded border-l-4 border-[var(--color-mars-red)] bg-black/5 dark:bg-black/30 p-3"><dt class="text-xs uppercase text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">Duration</dt><dd class="font-display font-bold text-[var(--color-mars-cyan)]">{campaign.duration_hours}h</dd></div>
      <div class="rounded border-l-4 border-[var(--color-mars-red)] bg-black/5 dark:bg-black/30 p-3"><dt class="text-xs uppercase text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">Begin</dt><dd class="font-display font-bold text-[var(--color-mars-cyan)] text-sm">{formatStart(campaign.started_at)}</dd></div>
      <div class="rounded border-l-4 border-[var(--color-mars-red)] bg-black/5 dark:bg-black/30 p-3"><dt class="text-xs uppercase text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">Expire</dt><dd class="font-display font-bold text-[var(--color-mars-cyan)] text-sm">{formatStart(campaign.ends_at)}</dd></div>
      <div class="rounded border-l-4 border-[var(--color-mars-red)] bg-black/5 dark:bg-black/30 p-3"><dt class="text-xs uppercase text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">Provinces</dt><dd class="font-display font-bold text-[var(--color-mars-cyan)]">{campaign.provinces.length} active</dd></div>
    </dl>

    {#if campaign.trigger}
      <p class="text-xs italic text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">Trigger: {campaign.trigger}</p>
    {/if}
  </section>

  <CampaignSummary {campaign} {sessions} />

  <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {#each campaign.provinces as province (province)}
      {#if province === 'sproutlab' || province === 'sep-dashboard' || province === 'sep-invoicing'}
        <ProvinceCard {province} phases={phasesByProvince[province] ?? []} {sessions} size_label={sizeLabels[province]} />
      {/if}
    {/each}
  </section>

  <Timeline phases={campaign.phases} />
  <Checkpoint />
  <LoreSchema />

  <div class="flex items-center justify-center gap-3 py-4">
    <button
      type="button"
      onclick={() => void campaignStore.refresh()}
      disabled={$campaignStore.loading}
      class="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] dark:border-[var(--color-border-dark)] px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
    >
      <Icon name="refresh" size={14} />
      {$campaignStore.loading ? 'Refreshing…' : 'Refresh from Codex'}
    </button>
  </div>
</div>
