import { estimateCost } from '$lib/constants/pricing';
import type { ClaudeModel, PhaseAggregate, Session } from '$lib/types';

export function aggregatePhase(phase_id: string, sessions: Session[]): PhaseAggregate {
  const inPhase = sessions.filter((s) => s.phase_id === phase_id);

  let tokens_in = 0;
  let tokens_out = 0;
  let wall_clock_ms = 0;
  let commits = 0;
  let loc_delta = 0;
  let cost = 0;
  const by_model: Partial<Record<ClaudeModel, number>> = {};

  for (const s of inPhase) {
    const ti = s.tokens_in ?? 0;
    const to = s.tokens_out ?? 0;
    tokens_in += ti;
    tokens_out += to;
    commits += s.commits?.length ?? 0;
    loc_delta += s.loc_delta ?? 0;
    if (s.started_at && s.ended_at) {
      wall_clock_ms += Math.max(0, new Date(s.ended_at).getTime() - new Date(s.started_at).getTime());
    }
    if (s.model) {
      cost += estimateCost(s.model, ti, to);
      by_model[s.model] = (by_model[s.model] ?? 0) + ti + to;
    }
  }

  const tokens_total = tokens_in + tokens_out;
  const efficiency = tokens_in === 0 ? 0 : tokens_out / tokens_in;

  return {
    phase_id,
    session_count: inPhase.length,
    tokens_in,
    tokens_out,
    tokens_total,
    estimated_cost_usd: cost,
    wall_clock_minutes: Math.round(wall_clock_ms / 60000),
    commits,
    loc_delta,
    efficiency,
    by_model
  };
}

export function aggregateCampaign(campaign_id: string, sessions: Session[]) {
  const inCampaign = sessions.filter((s) => s.campaign_id === campaign_id);
  let tokens_in = 0;
  let tokens_out = 0;
  let cost = 0;
  let commits = 0;
  let loc_delta = 0;

  for (const s of inCampaign) {
    const ti = s.tokens_in ?? 0;
    const to = s.tokens_out ?? 0;
    tokens_in += ti;
    tokens_out += to;
    commits += s.commits?.length ?? 0;
    loc_delta += s.loc_delta ?? 0;
    if (s.model) cost += estimateCost(s.model, ti, to);
  }

  return {
    session_count: inCampaign.length,
    tokens_in,
    tokens_out,
    tokens_total: tokens_in + tokens_out,
    estimated_cost_usd: cost,
    commits,
    loc_delta,
    efficiency: tokens_in === 0 ? 0 : tokens_out / tokens_in
  };
}

export function formatUsd(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
}

export function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}
