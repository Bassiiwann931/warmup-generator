"use client";

import { useState } from "react";
import ResultsView from "@/components/ResultsView";
import { WarmupStrategy } from "@/types";

interface FormData {
  domainHistory: string;
  listSize: string;
  listAge: string;
  engagementLevel: string;
  esp: string;
  dailyVolumeTarget: string;
  useCase: string;
  industry: string;
  ispMix: string;
  previousIssues: string;
}

const initialForm: FormData = {
  domainHistory: "Cold Start",
  listSize: "",
  listAge: "",
  engagementLevel: "Medium",
  esp: "SendGrid",
  dailyVolumeTarget: "",
  useCase: "Marketing",
  industry: "E-commerce",
  ispMix: "Mixed",
  previousIssues: "",
};

export default function Home() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WarmupStrategy | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate strategy");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setForm(initialForm);
  };

  if (result) {
    return <ResultsView strategy={result} onReset={handleReset} />;
  }

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 text-blue-400 text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            AI-Powered Deliverability Tool
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Email Warmup Strategy{" "}
            <span className="text-blue-400">Generator</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Get a custom week-by-week warmup plan tailored to your domain
            history, list profile, and sending infrastructure.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-900/30 border border-red-500/40 rounded-xl p-4 text-red-300 text-sm">
            <strong className="font-semibold">Error:</strong> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Domain & IP History */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="section-number">1</span>
              Domain &amp; IP History
            </h2>
            <div>
              <label className="form-label">Warmup Scenario</label>
              <div className="relative">
                <select
                  name="domainHistory"
                  value={form.domainHistory}
                  onChange={handleChange}
                  className="form-select pr-10"
                >
                  <option>Cold Start</option>
                  <option>Migration</option>
                  <option>Rehab</option>
                </select>
                <ChevronIcon />
              </div>
              <p className="mt-1.5 text-xs text-slate-500">
                Cold Start = new domain/IP · Migration = switching ESP · Rehab =
                recovering reputation
              </p>
            </div>
          </div>

          {/* Section 2: List Profile */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="section-number">2</span>
              List Profile
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Total List Size</label>
                <input
                  type="number"
                  name="listSize"
                  value={form.listSize}
                  onChange={handleChange}
                  placeholder="e.g. 50000"
                  min="1"
                  required
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">List Age (months)</label>
                <input
                  type="number"
                  name="listAge"
                  value={form.listAge}
                  onChange={handleChange}
                  placeholder="e.g. 24"
                  min="0"
                  required
                  className="form-input"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="form-label">Engagement Level</label>
              <div className="relative">
                <select
                  name="engagementLevel"
                  value={form.engagementLevel}
                  onChange={handleChange}
                  className="form-select pr-10"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                  <option>Unknown</option>
                </select>
                <ChevronIcon />
              </div>
            </div>
          </div>

          {/* Section 3: Sending Infrastructure */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="section-number">3</span>
              Sending Infrastructure
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Email Service Provider (ESP)</label>
                <div className="relative">
                  <select
                    name="esp"
                    value={form.esp}
                    onChange={handleChange}
                    className="form-select pr-10"
                  >
                    <option>SendGrid</option>
                    <option>Mailgun</option>
                    <option>Amazon SES</option>
                    <option>Postmark</option>
                    <option>SparkPost</option>
                    <option>Klaviyo</option>
                    <option>Iterable</option>
                    <option>Braze</option>
                    <option>HubSpot</option>
                    <option>Salesforce Marketing Cloud</option>
                    <option>Other</option>
                  </select>
                  <ChevronIcon />
                </div>
              </div>
              <div>
                <label className="form-label">Daily Volume Target (emails/day)</label>
                <input
                  type="number"
                  name="dailyVolumeTarget"
                  value={form.dailyVolumeTarget}
                  onChange={handleChange}
                  placeholder="e.g. 10000"
                  min="1"
                  required
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Use Case & Industry */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="section-number">4</span>
              Use Case &amp; Industry
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Use Case</label>
                <div className="relative">
                  <select
                    name="useCase"
                    value={form.useCase}
                    onChange={handleChange}
                    className="form-select pr-10"
                  >
                    <option>Marketing</option>
                    <option>Transactional</option>
                    <option>Newsletter</option>
                    <option>Promotional</option>
                    <option>Drip / Nurture</option>
                    <option>Re-engagement</option>
                    <option>Mixed</option>
                  </select>
                  <ChevronIcon />
                </div>
              </div>
              <div>
                <label className="form-label">Industry</label>
                <div className="relative">
                  <select
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    className="form-select pr-10"
                  >
                    <option>E-commerce</option>
                    <option>SaaS / Technology</option>
                    <option>Financial Services</option>
                    <option>Healthcare</option>
                    <option>Media / Publishing</option>
                    <option>Education</option>
                    <option>Non-profit</option>
                    <option>Travel & Hospitality</option>
                    <option>Real Estate</option>
                    <option>Other</option>
                  </select>
                  <ChevronIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: ISP Mix */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="section-number">5</span>
              ISP Mix
            </h2>
            <div>
              <label className="form-label">Primary ISP Distribution</label>
              <div className="relative">
                <select
                  name="ispMix"
                  value={form.ispMix}
                  onChange={handleChange}
                  className="form-select pr-10"
                >
                  <option>Gmail-heavy</option>
                  <option>Outlook B2B</option>
                  <option>Yahoo</option>
                  <option>Mixed</option>
                  <option>International</option>
                </select>
                <ChevronIcon />
              </div>
            </div>
          </div>

          {/* Section 6: Previous Issues */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="section-number">6</span>
              Previous Issues{" "}
              <span className="text-slate-500 text-sm font-normal">(optional)</span>
            </h2>
            <div>
              <label className="form-label">
                Describe any past deliverability problems
              </label>
              <textarea
                name="previousIssues"
                value={form.previousIssues}
                onChange={handleChange}
                rows={4}
                placeholder="e.g. High bounce rates, spam complaints, Google Postmaster deferral, blacklisting..."
                className="form-input resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800
                       disabled:cursor-not-allowed text-white font-semibold rounded-xl
                       transition-all duration-200 flex items-center justify-center gap-3
                       text-lg shadow-lg shadow-blue-900/40"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Generating Strategy...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Generate Warmup Strategy
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

function ChevronIcon() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
      <svg
        className="w-4 h-4 text-slate-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}
