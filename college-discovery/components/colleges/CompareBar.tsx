"use client";
import Link from "next/link";
import { colleges } from "@/lib/data";
import { Button } from "@/components/ui/Button";

interface CompareBarProps {
  compareIds: string[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function CompareBar({ compareIds, onRemove, onClear }: CompareBarProps) {
  if (compareIds.length === 0) return null;

  const selected = compareIds.map((id) => colleges.find((c) => c.id === id)).filter(Boolean);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-blue-600 shadow-2xl animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4 flex-wrap">
        <span className="text-sm font-semibold text-slate-700 shrink-0">
          Compare ({compareIds.length}/3):
        </span>
        <div className="flex gap-2 flex-1 flex-wrap">
          {selected.map((c) => (
            <div
              key={c!.id}
              className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5 text-sm font-medium text-blue-800"
            >
              {c!.shortName}
              <button
                onClick={() => onRemove(c!.id)}
                className="text-blue-400 hover:text-blue-700 ml-1"
                aria-label={`Remove ${c!.shortName}`}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          ))}
          {Array.from({ length: 3 - compareIds.length }).map((_, i) => (
            <div key={i} className="flex items-center border border-dashed border-slate-300 rounded-lg px-3 py-1.5 text-sm text-slate-400">
              + Add college
            </div>
          ))}
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="ghost" size="sm" onClick={onClear} className="text-slate-500">
            Clear
          </Button>
          <Link href="/compare">
            <Button variant="primary" size="sm" disabled={compareIds.length < 2}>
              Compare Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
