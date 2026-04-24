import type { CodexCampaigns, CodexJournal } from '$lib/types';
import { CODEX_PATHS, codexRaw } from './config';

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export const fetchJournal = () => fetchJson<CodexJournal>(codexRaw(CODEX_PATHS.journal));
export const fetchCampaigns = () => fetchJson<CodexCampaigns>(codexRaw(CODEX_PATHS.campaigns));
export const fetchCanons = () => fetchJson<unknown>(codexRaw(CODEX_PATHS.canons));
export const fetchVolumes = () => fetchJson<unknown>(codexRaw(CODEX_PATHS.volumes));
