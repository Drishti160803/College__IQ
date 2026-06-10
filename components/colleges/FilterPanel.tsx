"use client";
import { FilterState } from "@/types";
import { STATES, TYPES, EXAMS } from "@/lib/data";
import { formatCurrency, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface FilterPanelProps {
  filters: FilterState;
  onUpdate: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onToggle: <K extends keyof FilterState>(key: K, value: string) => void;
  onReset: () => void;
  activeCount: number;
}

function CheckboxGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</p>
      <div className="space-y-1.5">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => onToggle(opt)}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
            />
            <span className="text-sm text-slate-700 group-hover:text-slate-900">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function FilterPanel({ filters, onUpdate, onToggle, onReset, activeCount }: FilterPanelProps) {
  return (
    <aside className="bg-white rounded-xl border border-slate-200 p-5 sticky top-24 overflow-y-auto max-h-[calc(100vh-7rem)]">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-slate-900 text-base flex items-center gap-2">
          Filters
          {activeCount > 0 && (
            <span className="bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {activeCount}
            </span>
          )}
        </h2>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset} className="text-blue-600 hover:text-blue-700 text-xs">
            Reset all
          </Button>
        )}
      </div>

      <div className="space-y-6 divide-y divide-slate-100">
        {/* College Type */}
        <div className="pt-0">
          <CheckboxGroup
            label="College Type"
            options={TYPES}
            selected={filters.types}
            onToggle={(v) => onToggle("types", v)}
          />
        </div>

        {/* State */}
        <div className="pt-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">State</p>
          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {STATES.map((state) => (
              <label key={state} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.states.includes(state)}
                  onChange={() => onToggle("states", state)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
                />
                <span className="text-sm text-slate-700 group-hover:text-slate-900">{state}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Fees */}
        <div className="pt-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Max Annual Fee
          </p>
          <input
            type="range"
            min={0}
            max={2000000}
            step={50000}
            value={filters.feeMax}
            onChange={(e) => onUpdate("feeMax", Number(e.target.value))}
            className="w-full mb-2"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>₹0</span>
            <span className="font-semibold text-blue-600">{formatCurrency(filters.feeMax)}</span>
            <span>₹20L</span>
          </div>
        </div>

        {/* Min Rating */}
        <div className="pt-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Min Rating
          </p>
          <div className="flex gap-2 flex-wrap">
            {[0, 3, 3.5, 4, 4.5].map((r) => (
              <button
                key={r}
                onClick={() => onUpdate("ratingMin", r)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors",
                  filters.ratingMin === r
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                )}
              >
                {r === 0 ? "Any" : `${r}+`}
              </button>
            ))}
          </div>
        </div>

        {/* Exam */}
        <div className="pt-4">
          <CheckboxGroup
            label="Entrance Exam"
            options={EXAMS}
            selected={filters.exams}
            onToggle={(v) => onToggle("exams", v)}
          />
        </div>
      </div>
    </aside>
  );
}
