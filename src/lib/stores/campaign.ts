import { fetchCampaigns, fetchJournal } from '$lib/codex/fetchers';
import { WAR_TIME_2026_04_24 } from '$lib/data/war-time-campaign';
import type { Campaign, Session } from '$lib/types';
import { writable } from 'svelte/store';

export interface CampaignState {
  campaign: Campaign;
  sessions: Session[];
  source: 'codex' | 'seed';
  loading: boolean;
  error: string | null;
  last_fetched: Date | null;
}

function initial(): CampaignState {
  return {
    campaign: WAR_TIME_2026_04_24,
    sessions: [],
    source: 'seed',
    loading: false,
    error: null,
    last_fetched: null
  };
}

function createCampaignStore() {
  const { subscribe, update } = writable<CampaignState>(initial());

  async function refresh() {
    update((s) => ({ ...s, loading: true, error: null }));
    const [campaigns, journal] = await Promise.all([fetchCampaigns(), fetchJournal()]);
    update(() => {
      const current = campaigns?.campaigns?.[0];
      const campaign = current ?? WAR_TIME_2026_04_24;
      const sessions = (journal?.sessions ?? []).filter((x) => x.campaign_id === campaign.id);
      return {
        campaign,
        sessions,
        source: current ? 'codex' : 'seed',
        loading: false,
        error: null,
        last_fetched: new Date()
      };
    });
  }

  return { subscribe, refresh };
}

export const campaignStore = createCampaignStore();
