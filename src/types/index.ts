export interface WeeklyPlan {
  week: number;
  dailyVolume: number;
  totalVolume: number;
  minOpenRate: string;
  segments: string;
  focus: string;
  warning?: string;
}

export interface ISPTips {
  gmail: string;
  outlook: string;
  yahoo: string;
}

export interface WarmupStrategy {
  summary: string;
  duration: string;
  keyRules: string[];
  weeklyPlan: WeeklyPlan[];
  ispTips: ISPTips;
  redFlags: string[];
  successMetrics: string[];
}
