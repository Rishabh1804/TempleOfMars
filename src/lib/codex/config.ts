export const CODEX_OWNER = 'rishabh1804';
export const CODEX_REPO = 'Codex';
export const CODEX_REF = 'main';

export const codexRaw = (path: string): string =>
  `https://raw.githubusercontent.com/${CODEX_OWNER}/${CODEX_REPO}/${CODEX_REF}/${path}`;

export const CODEX_PATHS = {
  journal: 'data/journal.json',
  canons: 'data/canons.json',
  volumes: 'data/volumes.json',
  campaigns: 'data/campaigns.json'
} as const;
