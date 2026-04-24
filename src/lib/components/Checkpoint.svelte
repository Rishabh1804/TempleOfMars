<script lang="ts">
  interface CheckpointEvent { hour: number; title: string; detail: string; }

  const checkpoints: CheckpointEvent[] = [
    { hour: 0, title: 'War Time Begins', detail: 'All leads start' },
    { hour: 12, title: 'First Status', detail: 'Feature locks confirmed' },
    { hour: 24, title: 'Chronicle I', detail: 'Phase 1 begins' },
    { hour: 36, title: 'Merge Gate', detail: 'Phase 1 → Phase 2' },
    { hour: 48, title: 'Chronicle II', detail: 'Phase 2 merges' },
    { hour: 60, title: 'Final Push', detail: 'Bug squashing' },
    { hour: 72, title: 'War Time Expires', detail: 'Handoff complete' }
  ];
</script>

<section class="rounded-lg border-2 border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-white/80 dark:bg-black/20 p-6">
  <h2 class="font-display text-xl uppercase tracking-wider text-[var(--color-mars-red)] mb-5">Critical Checkpoints</h2>
  <ol class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
    {#each checkpoints as cp (cp.hour)}
      <li class="rounded border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-3 text-center">
        <div class="font-display font-bold text-lg text-[var(--color-mars-cyan)] tabular-nums">H{cp.hour}</div>
        <div class="font-medium text-sm mt-1">{cp.title}</div>
        <div class="text-xs text-[var(--color-fg-muted)] dark:text-[var(--color-fg-muted-dark)] mt-1">{cp.detail}</div>
      </li>
    {/each}
  </ol>
</section>
