"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { colleges } from "@/lib/data";
import { formatCurrency, formatPackage, cn } from "@/lib/utils";
import { useCompareStore } from "@/store/compare";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { College } from "@/types";

function CollegeSelector({
  value,
  onChange,
  exclude,
  slot,
}: {
  value: string;
  onChange: (id: string) => void;
  exclude: string[];
  slot: number;
}) {
  const available = colleges.filter((c) => !exclude.includes(c.id) || c.id === value);
  return (
    <div className="flex-1 min-w-0">
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
        College {slot}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-xl bg-white text-slate-800 text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
      >
        <option value="">— Select College —</option>
        {available.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
    </div>
  );
}

type RowDef = {
  label: string;
  key: string;
  render: (c: College) => React.ReactNode;
  better?: "lower" | "higher";
};

const compareRows: RowDef[] = [
  {
    label: "Location",
    key: "location",
    render: (c) => `${c.location.city}, ${c.location.state}`,
  },
  {
    label: "Type",
    key: "type",
    render: (c) => <Badge variant={c.type === "Government" ? "success" : "blue"}>{c.type}</Badge>,
  },
  {
    label: "Established",
    key: "established",
    render: (c) => c.established,
  },
  {
    label: "NIRF Rank",
    key: "nirf",
    render: (c) => c.ranking.nirf ? `#${c.ranking.nirf}` : "—",
    better: "lower",
  },
  {
    label: "Rating",
    key: "rating",
    render: (c) => (
      <span className="inline-flex items-center gap-1 font-bold text-amber-600">
        {c.rating} ★
      </span>
    ),
    better: "higher",
  },
  {
    label: "B.Tech Annual Fee",
    key: "btech_fee",
    render: (c) => c.fees.btech ? formatCurrency(c.fees.btech) : "—",
    better: "lower",
  },
  {
    label: "Average Package",
    key: "avg_pkg",
    render: (c) => formatPackage(c.placements.averagePackage),
    better: "higher",
  },
  {
    label: "Highest Package",
    key: "high_pkg",
    render: (c) => formatPackage(c.placements.highestPackage),
    better: "higher",
  },
  {
    label: "Placement Rate",
    key: "placement",
    render: (c) => `${c.placements.placementRate}%`,
    better: "higher",
  },
  {
    label: "Total Courses",
    key: "courses",
    render: (c) => c.courses.length,
    better: "higher",
  },
  {
    label: "Accreditations",
    key: "accred",
    render: (c) => (
      <div className="flex flex-wrap gap-1">
        {c.accreditation.map((a) => <Badge key={a} variant="outline" size="sm">{a}</Badge>)}
      </div>
    ),
  },
  {
    label: "Top Recruiters",
    key: "recruiters",
    render: (c) => (
      <div className="text-xs text-slate-600 leading-relaxed">
        {c.placements.topRecruiters.slice(0, 3).join(", ")}
      </div>
    ),
  },
  {
    label: "Facilities",
    key: "facilities",
    render: (c) => (
      <div className="text-xs text-slate-600 leading-relaxed">
        {c.facilities.slice(0, 4).join(" · ")}
      </div>
    ),
  },
];

function getBestIdx(row: RowDef, selected: College[]): number {
  if (!row.better) return -1;
  const vals = selected.map((c) => {
    if (row.key === "nirf") return c.ranking.nirf ?? 9999;
    if (row.key === "btech_fee") return c.fees.btech ?? 9999999;
    if (row.key === "avg_pkg") return c.placements.averagePackage;
    if (row.key === "high_pkg") return c.placements.highestPackage;
    if (row.key === "placement") return c.placements.placementRate;
    if (row.key === "rating") return c.rating;
    if (row.key === "courses") return c.courses.length;
    return 0;
  });
  const best = row.better === "higher" ? Math.max(...vals) : Math.min(...vals);
  return vals.indexOf(best);
}

export default function ComparePage() {
  const { compareIds } = useCompareStore();

  const [selections, setSelections] = useState<string[]>(() => {
    const pre = compareIds.slice(0, 3);
    while (pre.length < 3) pre.push("");
    return pre;
  });

  const selected = selections
    .map((id) => (id ? colleges.find((c) => c.id === id) : undefined))
    .filter(Boolean) as College[];

  const handleChange = (idx: number, id: string) => {
    setSelections((prev) => {
      const next = [...prev];
      next[idx] = id;
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Compare Colleges</h1>
        <p className="text-slate-500 mt-1">Select up to 3 colleges for a detailed side-by-side comparison</p>
      </div>

      {/* Selectors */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6">
        <div className="flex gap-4 flex-col sm:flex-row">
          {[0, 1, 2].map((i) => (
            <CollegeSelector
              key={i}
              slot={i + 1}
              value={selections[i]}
              onChange={(id) => handleChange(i, id)}
              exclude={selections.filter((_, j) => j !== i)}
            />
          ))}
        </div>
        {selected.length < 2 && (
          <p className="text-sm text-amber-600 mt-3 flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Select at least 2 colleges to compare
          </p>
        )}
      </div>

      {selected.length >= 2 ? (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {/* College headers */}
          <div className="grid border-b border-slate-200" style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}>
            <div className="p-4 bg-slate-50 border-r border-slate-200" />
            {selected.map((college) => (
              <div key={college.id} className="p-5 border-r last:border-r-0 border-slate-200">
                <div className="relative h-28 rounded-xl overflow-hidden bg-blue-100 mb-3">
                  <Image src={college.image} alt={college.name} fill className="object-cover" sizes="300px" />
                </div>
                <Link href={`/college/${college.id}`} className="font-bold text-slate-900 text-sm hover:text-blue-600 leading-snug block mb-1">
                  {college.name}
                </Link>
                <p className="text-xs text-slate-500">{college.location.city}, {college.location.state}</p>
              </div>
            ))}
          </div>

          {/* Compare rows */}
          {compareRows.map((row, ri) => {
            const bestIdx = getBestIdx(row, selected);
            return (
              <div
                key={row.key}
                className={cn(
                  "grid border-b last:border-b-0 border-slate-100",
                  ri % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                )}
                style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}
              >
                <div className="px-4 py-3.5 border-r border-slate-200 flex items-center">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{row.label}</span>
                </div>
                {selected.map((college, ci) => (
                  <div
                    key={college.id}
                    className={cn(
                      "px-4 py-3.5 border-r last:border-r-0 border-slate-100 flex items-center text-sm text-slate-800",
                      bestIdx === ci && row.better && "bg-green-50"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      {row.render(college)}
                    </div>
                    {bestIdx === ci && row.better && (
                      <span className="ml-2 shrink-0 text-green-600">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-16 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="7" height="14" rx="2" stroke="#94a3b8" strokeWidth="2"/>
              <rect x="14" y="5" width="7" height="14" rx="2" stroke="#94a3b8" strokeWidth="2"/>
            </svg>
          </div>
          <h3 className="font-semibold text-slate-700 text-lg mb-1">Select Colleges to Compare</h3>
          <p className="text-slate-400 text-sm mb-5">Choose at least 2 colleges from the dropdowns above</p>
          <Link href="/colleges">
            <Button variant="primary">Browse Colleges</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
