"use client";
import { useState } from "react";
import Link from "next/link";
import { predictColleges } from "@/lib/utils";
import { formatPackage, formatCurrency, getChanceColor, cn } from "@/lib/utils";
import { PredictorInput, PredictorResult } from "@/types";
import { EXAMS } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const CATEGORIES = ["General", "OBC", "SC", "ST", "EWS"];
const BRANCHES = ["Any", "Computer Science", "Electrical", "Mechanical", "Electronics", "Civil", "Chemical"];

const examRankLabels: Record<string, string> = {
  "JEE Advanced": "JEE Advanced Rank (AIR)",
  "JEE Main": "JEE Main Rank (CRL)",
  "BITSAT": "BITSAT Score (out of 450)",
  "VITEEE": "VITEEE Rank",
  "CAT": "CAT Percentile",
  "GATE": "GATE Score",
  "SRMJEEE": "SRMJEEE Rank",
};

const examPlaceholders: Record<string, string> = {
  "JEE Advanced": "e.g. 1200",
  "JEE Main": "e.g. 8500",
  "BITSAT": "e.g. 320",
  "VITEEE": "e.g. 4500",
  "CAT": "e.g. 99",
  "GATE": "e.g. 750",
  "SRMJEEE": "e.g. 6000",
};

const sampleInputs = [
  { exam: "JEE Advanced", rank: 500, category: "General", label: "JEE Adv Rank 500" },
  { exam: "JEE Main", rank: 8000, category: "General", label: "JEE Main Rank 8000" },
  { exam: "BITSAT", rank: 300, category: "General", label: "BITSAT Score 300" },
  { exam: "CAT", rank: 99, category: "General", label: "CAT 99 Percentile" },
];

export default function PredictorPage() {
  const [form, setForm] = useState<PredictorInput>({
    exam: "JEE Advanced",
    rank: 0,
    category: "General",
    branch: "Any",
  });
  const [results, setResults] = useState<PredictorResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [rankInput, setRankInput] = useState("");

  const handleSubmit = () => {
    if (!rankInput || Number(rankInput) <= 0) return;
    setLoading(true);
    setTimeout(() => {
      const input = { ...form, rank: Number(rankInput) };
      const res = predictColleges(input);
      setResults(res);
      setLoading(false);
    }, 700);
  };

  const handleSample = (s: typeof sampleInputs[0]) => {
    setForm({ exam: s.exam, rank: s.rank, category: s.category, branch: "Any" });
    setRankInput(String(s.rank));
    setResults(null);
  };

  const highCount = results?.filter((r) => r.chance === "High").length ?? 0;
  const medCount = results?.filter((r) => r.chance === "Medium").length ?? 0;
  const lowCount = results?.filter((r) => r.chance === "Low").length ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">College Admission Predictor</h1>
        <p className="text-slate-500 mt-1">Enter your exam and rank to discover your admission chances at top colleges</p>
      </div>

      <div className="grid lg:grid-cols-[380px_1fr] gap-6">
        {/* Input form */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Your Details
            </h2>

            {/* Exam */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Entrance Exam</label>
              <div className="grid grid-cols-2 gap-2">
                {EXAMS.map((exam) => (
                  <button
                    key={exam}
                    onClick={() => { setForm((f) => ({ ...f, exam })); setResults(null); }}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium border transition-colors text-left",
                      form.exam === exam
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                    )}
                  >
                    {exam}
                  </button>
                ))}
              </div>
            </div>

            {/* Rank */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {examRankLabels[form.exam] ?? "Rank / Score"}
              </label>
              <input
                type="number"
                value={rankInput}
                onChange={(e) => { setRankInput(e.target.value); setResults(null); }}
                placeholder={examPlaceholders[form.exam] ?? "Enter your rank"}
                min={1}
                className="w-full border border-slate-200 rounded-xl bg-white text-slate-900 text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setForm((f) => ({ ...f, category: cat })); setResults(null); }}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors",
                      form.category === cat
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              loading={loading}
              onClick={handleSubmit}
              disabled={!rankInput || Number(rankInput) <= 0}
              className="w-full"
            >
              {loading ? "Predicting..." : "Predict My Colleges"}
            </Button>
          </div>

          {/* Sample inputs */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Try a Sample</p>
            <div className="space-y-2">
              {sampleInputs.map((s) => (
                <button
                  key={s.label}
                  onClick={() => handleSample(s)}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center justify-between"
                >
                  <span className="font-medium text-slate-700">{s.label}</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-slate-400">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Prediction Guide</p>
            <div className="space-y-2">
              {[
                { chance: "High" as const, desc: "Your rank is well within the closing cutoff" },
                { chance: "Medium" as const, desc: "Your rank is near the closing cutoff" },
                { chance: "Low" as const, desc: "Your rank slightly exceeds last year's cutoff" },
              ].map((g) => (
                <div key={g.chance} className="flex items-start gap-2.5">
                  <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full border mt-0.5 shrink-0", getChanceColor(g.chance))}>
                    {g.chance}
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          {!results && !loading && (
            <div className="h-full flex flex-col items-center justify-center bg-white border border-dashed border-slate-300 rounded-2xl p-16 text-center min-h-[400px]">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#1d4ed8" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#1d4ed8" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-semibold text-slate-700 text-lg mb-1">Enter Your Details</h3>
              <p className="text-slate-400 text-sm">Fill in your exam and rank on the left to see your college predictions</p>
            </div>
          )}

          {loading && (
            <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center min-h-[400px] flex flex-col items-center justify-center">
              <div className="spinner mx-auto mb-4" style={{ width: 36, height: 36, borderWidth: 3 }} />
              <p className="font-medium text-slate-700">Analysing cutoffs...</p>
              <p className="text-slate-400 text-sm mt-1">Comparing your rank with 2024 data</p>
            </div>
          )}

          {results && !loading && (
            <div className="space-y-4 animate-fade-in">
              {/* Summary */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                  <div>
                    <h2 className="font-bold text-slate-900 text-lg">
                      {results.length === 0 ? "No matches found" : `${results.length} College${results.length !== 1 ? "s" : ""} Found`}
                    </h2>
                    <p className="text-slate-500 text-sm mt-0.5">
                      Based on {form.exam} {form.category === "General" ? "" : `(${form.category})`} rank: {rankInput}
                    </p>
                  </div>
                  {results.length > 0 && (
                    <div className="flex gap-3">
                      {highCount > 0 && <div className="text-center"><p className="text-xl font-bold text-green-600">{highCount}</p><p className="text-xs text-slate-400">High</p></div>}
                      {medCount > 0 && <div className="text-center"><p className="text-xl font-bold text-yellow-600">{medCount}</p><p className="text-xs text-slate-400">Medium</p></div>}
                      {lowCount > 0 && <div className="text-center"><p className="text-xl font-bold text-red-600">{lowCount}</p><p className="text-xs text-slate-400">Low</p></div>}
                    </div>
                  )}
                </div>

                {results.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-slate-500 mb-2">No colleges matched your rank for this exam.</p>
                    <p className="text-slate-400 text-sm">Try a different exam or check another category.</p>
                  </div>
                )}
              </div>

              {/* Result cards */}
              {results.map((result, i) => (
                <div
                  key={`${result.college.id}-${result.branch}-${i}`}
                  className={cn(
                    "bg-white border rounded-2xl p-5 flex items-start gap-4 animate-fade-in",
                    result.chance === "High" ? "border-green-200" :
                    result.chance === "Medium" ? "border-yellow-200" : "border-red-200"
                  )}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 font-bold text-sm flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                      <Link href={`/college/${result.college.id}`} className="font-bold text-slate-900 hover:text-blue-600 text-base leading-snug">
                        {result.college.name}
                      </Link>
                      <span className={cn("text-xs font-bold px-3 py-1 rounded-full border shrink-0", getChanceColor(result.chance))}>
                        {result.chance} Chance
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge variant={result.college.type === "Government" ? "success" : "blue"} size="sm">
                        {result.college.type}
                      </Badge>
                      <span className="text-xs text-slate-500">
                        {result.college.location.city}, {result.college.location.state}
                      </span>
                      {result.branch !== "General" && (
                        <Badge variant="outline" size="sm">{result.branch}</Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <p className="text-xs text-slate-400">Cutoff Rank</p>
                        <p className="font-bold text-slate-800 text-sm">{result.cutoffRank.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Avg Package</p>
                        <p className="font-bold text-slate-800 text-sm">{formatPackage(result.college.placements.averagePackage)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Annual Fee</p>
                        <p className="font-bold text-slate-800 text-sm">
                          {result.college.fees.btech ? formatCurrency(result.college.fees.btech) : "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Rating</p>
                        <p className="font-bold text-amber-600 text-sm">{result.college.rating} ★</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
