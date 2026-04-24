import { readable } from 'svelte/store';

export const now = readable(new Date(), (set) => {
  const id = setInterval(() => set(new Date()), 1000);
  return () => clearInterval(id);
});

export interface Countdown {
  label: 'until-start' | 'in-progress' | 'expired';
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total_seconds: number;
  progress_pct: number;
}

export function computeCountdown(now: Date, started_at: string, ends_at: string): Countdown {
  const start = new Date(started_at).getTime();
  const end = new Date(ends_at).getTime();
  const t = now.getTime();

  if (t < start) {
    return { label: 'until-start', ...breakdown(start - t), progress_pct: 0 };
  }
  if (t >= end) {
    return { label: 'expired', days: 0, hours: 0, minutes: 0, seconds: 0, total_seconds: 0, progress_pct: 100 };
  }
  const elapsed = t - start;
  const total = end - start;
  return {
    label: 'in-progress',
    ...breakdown(end - t),
    progress_pct: Math.min(100, Math.max(0, (elapsed / total) * 100))
  };
}

function breakdown(ms: number) {
  const total_seconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(total_seconds / 86400);
  const hours = Math.floor((total_seconds % 86400) / 3600);
  const minutes = Math.floor((total_seconds % 3600) / 60);
  const seconds = total_seconds % 60;
  return { total_seconds, days, hours, minutes, seconds };
}
