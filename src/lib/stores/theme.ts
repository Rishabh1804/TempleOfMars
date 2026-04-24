import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';
const KEY = 'templeofmars-theme';

function initial(): Theme {
  if (!browser) return 'dark';
  const stored = localStorage.getItem(KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function createTheme() {
  const { subscribe, set, update } = writable<Theme>(initial());
  return {
    subscribe,
    toggle: () =>
      update((t) => {
        const next: Theme = t === 'dark' ? 'light' : 'dark';
        if (browser) {
          localStorage.setItem(KEY, next);
          document.documentElement.classList.toggle('dark', next === 'dark');
        }
        return next;
      }),
    set: (t: Theme) => {
      if (browser) {
        localStorage.setItem(KEY, t);
        document.documentElement.classList.toggle('dark', t === 'dark');
      }
      set(t);
    }
  };
}

export const theme = createTheme();
