<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { pwaInfo } from 'virtual:pwa-info';
  import Icon from '$lib/components/Icon.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import FsBaseSlider from '$lib/components/FsBaseSlider.svelte';
  import { campaignStore } from '$lib/stores/campaign';

  let { children } = $props();

  onMount(() => {
    void campaignStore.refresh();
  });

  const webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');
</script>

<svelte:head>
  {@html webManifest}
</svelte:head>

<div class="min-h-screen flex flex-col max-w-[1400px] mx-auto px-4 md:px-6 py-6">
  <header class="flex items-center justify-between gap-4 pb-5 mb-8 border-b-[3px] border-[var(--color-mars-red)]">
    <div class="flex items-center gap-3">
      <Icon name="sword" size={28} class="text-[var(--color-mars-red)]" />
      <div>
        <h1 class="font-display text-2xl md:text-3xl uppercase tracking-wider text-[var(--color-mars-red)]">Temple of Mars</h1>
        <p class="text-xs italic text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">Watchtower of the Order</p>
      </div>
    </div>
    <nav class="flex items-center gap-2">
      <FsBaseSlider />
      <ThemeToggle />
    </nav>
  </header>

  <main class="flex-1">
    {@render children()}
  </main>

  <footer class="mt-12 pt-5 border-t border-black/10 dark:border-white/10 text-center text-xs text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">
    <p class="font-display text-sm mb-1">Temple of Mars · Watchtower of the Order</p>
    <p class="italic">Nothing is wasted. Every discovery becomes lore.</p>
  </footer>
</div>
