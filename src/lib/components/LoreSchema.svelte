<script lang="ts">
  const categories = [
    { title: 'Chronicles', body: ['Hour 0–24: Diagnosis, patch decisions, feature locks', 'Hour 24–48: Execution progress, discoveries, blockers', 'Hour 48–72: Final push, testing, deployment readiness', 'Hour 72 summary: Cross-province synthesis'] },
    { title: 'Doctrines', body: ['Sync Visibility: exposing connection state in PWAs', 'Cache Invalidation: Service Worker versioning strategy', 'Dashboard Recovery: git restore from known-good commit', 'Feature Staging: UI-first, then complex features'] },
    { title: 'Cautionary Tales', body: ['Hardcoded status: why badges drifted from reality', 'Compiled artifacts in source trees (SproutLab + Dashboard, pre-war)', 'Scope decisions: when to hold, when to expand', 'Near-misses: blockers, failures, lessons learned'] }
  ];
</script>

<section class="rounded-lg border-2 border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-white/80 dark:bg-black/20 p-6">
  <h2 class="font-display text-xl uppercase tracking-wider text-[var(--color-mars-red)] mb-5">Lore Recording Schema</h2>
  <div class="grid gap-4 md:grid-cols-3">
    {#each categories as cat (cat.title)}
      <article class="rounded bg-black/5 dark:bg-white/5 p-4 border-t-[3px] border-[var(--color-mars-red)]">
        <h3 class="font-display text-lg text-[var(--color-mars-cyan)] mb-3">{cat.title}</h3>
        <ul class="space-y-2 text-sm text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)]">
          {#each cat.body as line}<li>{line}</li>{/each}
        </ul>
      </article>
    {/each}
  </div>
</section>
