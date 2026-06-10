"use client";
import { useFilters } from "@/hooks/useFilters";
import { useCompareStore } from "@/store/compare";
import { CollegeCard } from "@/components/colleges/CollegeCard";
import { FilterPanel } from "@/components/colleges/FilterPanel";
import { CompareBar } from "@/components/colleges/CompareBar";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { CollegeCardSkeleton } from "@/components/ui/Skeleton";
import { useState, useEffect } from "react";

const SORT_OPTIONS = [
  { value: "rating", label: "Highest Rated" },
  { value: "ranking", label: "NIRF Ranking" },
  { value: "placement", label: "Best Placements" },
  { value: "fees_low", label: "Fees: Low to High" },
  { value: "fees_high", label: "Fees: High to Low" },
];

export default function CollegesPage() {
  const { filters, updateFilter, toggleArrayFilter, reset, results, activeCount } = useFilters();
  const { compareIds, toggle, remove, clear, isFull } = useCompareStore();
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Find Your College</h1>
        <p className="text-slate-500 mt-1">
          {loading ? "Loading..." : `${results.length} colleges found`}
          {activeCount > 0 && ` · ${activeCount} filter${activeCount > 1 ? "s" : ""} applied`}
        </p>
      </div>

      {/* Search + Sort bar */}
      <div className="flex gap-3 mb-6 flex-col sm:flex-row">
        <Input
          leftIcon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
              <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          }
          placeholder="Search by name, city, state, tag..."
          value={filters.query}
          onChange={(e) => updateFilter("query", e.target.value)}
          rightIcon={
            filters.query ? (
              <button onClick={() => updateFilter("query", "")} className="cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            ) : null
          }
          containerClassName="flex-1"
        />
        <div className="flex gap-2">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setFilterOpen((v) => !v)}
            className="md:hidden flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 rounded-lg bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 relative"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M6 12h12M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Filters
            {activeCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>
          <div className="w-48 shrink-0">
            <Select
              value={filters.sort}
              onChange={(e) => updateFilter("sort", e.target.value as typeof filters.sort)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filter — desktop */}
        <div className="hidden md:block w-64 shrink-0">
          <FilterPanel
            filters={filters}
            onUpdate={updateFilter}
            onToggle={toggleArrayFilter}
            onReset={reset}
            activeCount={activeCount}
          />
        </div>

        {/* Mobile filter drawer */}
        {filterOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setFilterOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">Filters</h2>
                <button onClick={() => setFilterOpen(false)} className="p-1 rounded-lg hover:bg-slate-100">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <FilterPanel
                filters={filters}
                onUpdate={updateFilter}
                onToggle={toggleArrayFilter}
                onReset={reset}
                activeCount={activeCount}
              />
            </div>
          </div>
        )}

        {/* Results grid */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => <CollegeCardSkeleton key={i} />)}
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="#94a3b8" strokeWidth="2"/>
                  <path d="M16.5 16.5L21 21" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="font-semibold text-slate-700 text-lg mb-1">No colleges found</h3>
              <p className="text-slate-400 text-sm mb-4">Try adjusting your filters</p>
              <button onClick={reset} className="text-blue-600 font-medium text-sm hover:underline">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {results.map((college) => (
                <CollegeCard
                  key={college.id}
                  college={college}
                  onCompare={toggle}
                  isInCompare={compareIds.includes(college.id)}
                  compareDisabled={isFull}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <CompareBar compareIds={compareIds} onRemove={remove} onClear={clear} />
    </div>
  );
}
