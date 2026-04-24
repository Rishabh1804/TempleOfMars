export type ProvinceId = 'sproutlab' | 'sep-dashboard' | 'sep-invoicing' | 'codex' | 'command-center';
export type BuilderName = 'lyra' | 'nyx' | 'sovereign' | 'theron' | 'solara' | 'cipher' | 'aurelius' | 'orinth' | 'ignis' | 'rune' | 'maren' | 'kael';
export type ClaudeModel = 'opus-4-7' | 'opus-4-6' | 'sonnet-4-6' | 'haiku-4-5' | 'other';
export type CampaignType = 'war-time' | 'peacetime' | 'velocity-event' | 'scope-pivot';
export type CampaignStatus = 'pending' | 'active' | 'expired' | 'complete';

export interface Campaign {
  id: string;
  type: CampaignType;
  status: CampaignStatus;
  title: string;
  started_at: string;
  ends_at: string;
  duration_hours: number;
  trigger?: string;
  provinces: ProvinceId[];
  phases: Phase[];
  qa_lead?: BuilderName;
  recorders?: BuilderName[];
}

export interface Phase {
  id: string;
  campaign_id: string;
  province: ProvinceId;
  name: string;
  order: number;
  hours: [number, number];
  acceptance?: string;
  tasks: Task[];
  leads: BuilderName[];
}

export interface Task {
  id: string;
  phase_id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'review' | 'complete' | 'blocked';
  notes?: string;
}

export interface Session {
  id: string;
  summary: string;
  volumes_touched?: string[];
  decisions?: string[];
  bugs_found?: number;
  handoff?: string;
  campaign_id?: string;
  phase_id?: string;
  task_id?: string;
  builder?: BuilderName;
  province?: ProvinceId;
  started_at?: string;
  ended_at?: string;
  model?: ClaudeModel;
  tokens_in?: number;
  tokens_out?: number;
  commits?: string[];
  loc_delta?: number;
  lore_generated?: string[];
}

export interface PhaseAggregate {
  phase_id: string;
  session_count: number;
  tokens_in: number;
  tokens_out: number;
  tokens_total: number;
  estimated_cost_usd: number;
  wall_clock_minutes: number;
  commits: number;
  loc_delta: number;
  efficiency: number;
  by_model: Partial<Record<ClaudeModel, number>>;
}

export interface CodexJournal {
  sessions: Session[];
  [key: string]: unknown;
}

export interface CodexCampaigns {
  campaigns: Campaign[];
}
