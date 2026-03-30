"use client";

import { WarmupStrategy } from "@/types";

interface Props {
  strategy: WarmupStrategy;
  onReset: () => void;
}

export default function ResultsView({ strategy, onReset }: Props) {
  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/30 rounded-full px-3 py-1 text-green-400 text-xs font-medium mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Strategy Generated
            </div>
            <h1 className="text-3xl font-bold text-white">
              Your Warmup Strategy
            </h1>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-[#0d1224] border border-[#1e3a5f]
                       text-slate-300 hover:text-white rounded-lg transition-colors text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            New Strategy
          </button>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-br from-blue-900/40 to-[#0d1224] border border-blue-500/30 rounded-xl p-6">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="bg-blue-600/30 border border-blue-500/40 text-blue-300 text-sm px-3 py-1 rounded-full font-medium">
              Duration: {strategy.duration}
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed">{strategy.summary}</p>
        </div>

        {/* Key Rules */}
        <Section title="Key Rules" icon="📋">
          <ul className="space-y-2">
            {strategy.keyRules.map((rule, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-slate-300 text-sm">{rule}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Weekly Plan */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span>📅</span> Week-by-Week Plan
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {strategy.weeklyPlan.map((week) => (
              <WeekCard key={week.week} week={week} />
            ))}
          </div>
        </div>

        {/* ISP Tips */}
        <Section title="ISP-Specific Tips" icon="🌐">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ISPCard name="Gmail" tip={strategy.ispTips.gmail} color="blue" />
            <ISPCard
              name="Outlook"
              tip={strategy.ispTips.outlook}
              color="indigo"
            />
            <ISPCard name="Yahoo" tip={strategy.ispTips.yahoo} color="purple" />
          </div>
        </Section>

        {/* Red Flags & Success Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Section title="Red Flags to Watch" icon="🚩">
            <ul className="space-y-2">
              {strategy.redFlags.map((flag, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-red-400 flex-shrink-0">▸</span>
                  <span className="text-slate-300 text-sm">{flag}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Success Metrics" icon="✅">
            <ul className="space-y-2">
              {strategy.successMetrics.map((metric, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-green-400 flex-shrink-0">▸</span>
                  <span className="text-slate-300 text-sm">{metric}</span>
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* Footer CTA */}
        <div className="text-center py-4">
          <button
            onClick={onReset}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium
                       rounded-xl transition-colors shadow-lg shadow-blue-900/40"
          >
            Generate Another Strategy
          </button>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#0d1224] border border-[#1e3a5f] rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h2>
      {children}
    </div>
  );
}

function WeekCard({ week }: { week: import("@/types").WeeklyPlan }) {
  return (
    <div className="bg-[#0d1224] border border-[#1e3a5f] rounded-xl p-5 hover:border-blue-500/40 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-300 font-bold text-sm flex items-center justify-center">
            W{week.week}
          </span>
          <div>
            <p className="text-white font-medium text-sm">{week.focus}</p>
            <p className="text-slate-500 text-xs">{week.segments}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Pill label="Daily" value={week.dailyVolume.toLocaleString()} />
          <Pill
            label="Total"
            value={week.totalVolume.toLocaleString()}
            highlight
          />
          <Pill label="Min Open" value={week.minOpenRate} />
        </div>
      </div>
      {week.warning && (
        <div className="mt-3 flex items-start gap-2 bg-amber-900/20 border border-amber-500/30 rounded-lg p-3">
          <span className="text-amber-400 text-sm flex-shrink-0">⚠</span>
          <p className="text-amber-300 text-xs">{week.warning}</p>
        </div>
      )}
    </div>
  );
}

function Pill({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg px-3 py-1.5 text-center ${
        highlight
          ? "bg-blue-600/20 border border-blue-500/30"
          : "bg-[#101830] border border-[#1e3a5f]"
      }`}
    >
      <p className="text-[10px] text-slate-500 uppercase tracking-wide">
        {label}
      </p>
      <p
        className={`text-sm font-semibold ${
          highlight ? "text-blue-300" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function ISPCard({
  name,
  tip,
  color,
}: {
  name: string;
  tip: string;
  color: "blue" | "indigo" | "purple";
}) {
  const colors = {
    blue: "bg-blue-900/20 border-blue-500/30 text-blue-400",
    indigo: "bg-indigo-900/20 border-indigo-500/30 text-indigo-400",
    purple: "bg-purple-900/20 border-purple-500/30 text-purple-400",
  };

  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <p className="font-semibold mb-2">{name}</p>
      <p className="text-slate-300 text-sm leading-relaxed">{tip}</p>
    </div>
  );
}
