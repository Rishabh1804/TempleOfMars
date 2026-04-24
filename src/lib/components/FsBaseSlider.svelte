<script lang="ts">
  import { fsBase, FS_TIERS, type FsTier } from '$lib/stores/fs-base';
  import Icon from './Icon.svelte';
</script>

<div class="inline-flex items-center gap-1 rounded-md border border-[var(--color-border)] dark:border-[var(--color-border-dark)] p-1">
  <Icon name="text-scale" size={14} class="mx-1 opacity-60" />
  {#each FS_TIERS as tier (tier)}
    <button
      type="button"
      onclick={() => fsBase.set(tier as FsTier)}
      class="px-2 py-0.5 text-xs rounded transition-colors {$fsBase === tier ? 'bg-[var(--color-mars-red)] text-white' : 'hover:bg-black/5 dark:hover:bg-white/5'}"
      aria-label="Text size {tier}"
      aria-pressed={$fsBase === tier}
    >
      {tier.replace('px', '')}
    </button>
  {/each}
</div>
