<script lang="ts">
  import type { Phase } from '$lib/types';

  interface Props { phases: Phase[]; }
  let { phases }: Props = $props();

  interface TimelineSlot { label: string; tasks: { province: string; summary: string }[]; }

  const slots: TimelineSlot[] = [
    { label: 'Hour 0–12', tasks: [] },
    { label: 'Hour 12–24', tasks: [] },
    { label: 'Hour 24–36', tasks: [] },
    { label: 'Hour 36–48', tasks: [] },
    { label: 'Hour 48–60', tasks: [] },
    { label: 'Hour 60–72', tasks: [] }
  ];

  for (const p of phases) {
    const startSlot = Math.floor(p.hours[0] / 12);
    const endSlot = Math.min(5, Math.ceil(p.hours[1] / 12) - 1);
    for (let i = startSlot; i <= endSlot; i++) {
      slots[i].tasks.push({ province: p.province, summary: `${shortProvince(p.province)}: ${p.name}` });
    }
  }

  function shortProvince(p: string): string {
    return { sproutlab: 'SproutLab', 'sep-dashboard': 'Dashboard', 'sep-invoicing': 'Invoicing' }[p] ?? p;
  }

  function provinceColor(p: string): string {
    return {
      sproutlab: 'var(--color-province-sproutlab)',
      'sep-dashboard': 'var(--color-province-dashboard)',
      'sep-invoicing': 'var(--color-province-invoicing)'
    }[p] ?? 'var(--color-border)';
  }
</script>

<section class="rounded-lg border-2 border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-white/80 dark:bg-black/20 p-6">
  <h2 class="font-display text-xl uppercase tracking-wider text-[var(--color-mars-red)] mb-5">72-Hour Timeline</h2>
  <ol class="space-y-4">
    {#each slots as slot (slot.label)}
      <li class="grid grid-cols-[100px_1fr] gap-4 items-start pb-3 border-b border-black/10 dark:border-white/10 last:border-b-0">
        <div class="font-bold text-sm text-[var(--color-mars-cyan)] bg-[var(--color-mars-cyan)]/10 rounded px-2 py-2 text-center tabular-nums">{slot.label}</div>
        <div class="grid gap-2 md:grid-cols-3">
          {#each slot.tasks as task}
            <div class="rounded bg-black/5 dark:bg-white/5 p-2 text-xs" style="border-left: 3px solid {provinceColor(task.province)}">{task.summary}</div>
          {/each}
        </div>
      </li>
    {/each}
  </ol>
</section>
