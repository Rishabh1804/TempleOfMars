import type { ClaudeModel } from '$lib/types';

export interface ModelRates {
  input_per_m: number;
  output_per_m: number;
}

export const PRICING: Record<ClaudeModel, ModelRates> = {
  'opus-4-7': { input_per_m: 15, output_per_m: 75 },
  'opus-4-6': { input_per_m: 15, output_per_m: 75 },
  'sonnet-4-6': { input_per_m: 3, output_per_m: 15 },
  'haiku-4-5': { input_per_m: 1, output_per_m: 5 },
  other: { input_per_m: 0, output_per_m: 0 }
};

export function estimateCost(model: ClaudeModel, tokens_in: number, tokens_out: number): number {
  const rate = PRICING[model] ?? PRICING.other;
  return (tokens_in / 1_000_000) * rate.input_per_m + (tokens_out / 1_000_000) * rate.output_per_m;
}
