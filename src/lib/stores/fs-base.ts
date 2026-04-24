import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const KEY = 'templeofmars-fs-base';
export const FS_TIERS = ['12px', '14px', '17px'] as const;
export type FsTier = (typeof FS_TIERS)[number];

function initial(): FsTier {
  if (!browser) return '14px';
  const stored = localStorage.getItem(KEY);
  return (FS_TIERS as readonly string[]).includes(stored ?? '') ? (stored as FsTier) : '14px';
}

function createFsBase() {
  const { subscribe, set } = writable<FsTier>(initial());
  return {
    subscribe,
    set: (t: FsTier) => {
      if (browser) {
        localStorage.setItem(KEY, t);
        document.documentElement.style.setProperty('--fs-base', t);
      }
      set(t);
    }
  };
}

export const fsBase = createFsBase();
