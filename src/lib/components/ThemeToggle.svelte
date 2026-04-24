<script lang="ts">
  import Icon from './Icon.svelte';
  import { theme } from '$lib/stores/theme';
</script>

<button
  type="button"
  onclick={() => theme.toggle()}
  class="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] dark:border-[var(--color-border-dark)] px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
  aria-label="Toggle theme"
>
  <Icon name={$theme === 'dark' ? 'sun' : 'moon'} size={16} />
  <span class="font-sans">{$theme === 'dark' ? 'Light' : 'Dark'}</span>
</button>
