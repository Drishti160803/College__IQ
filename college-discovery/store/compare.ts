"use client";
import { useState, useEffect, useCallback } from "react";

const COMPARE_KEY = "cd_compare";
const MAX_COMPARE = 3;

export function useCompareStore() {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COMPARE_KEY);
      if (stored) setCompareIds(JSON.parse(stored));
    } catch {}
  }, []);

  const save = useCallback((ids: string[]) => {
    setCompareIds(ids);
    try { localStorage.setItem(COMPARE_KEY, JSON.stringify(ids)); } catch {}
  }, []);

  const add = useCallback((id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id) || prev.length >= MAX_COMPARE) return prev;
      const next = [...prev, id];
      try { localStorage.setItem(COMPARE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setCompareIds((prev) => {
      const next = prev.filter((x) => x !== id);
      try { localStorage.setItem(COMPARE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const toggle = useCallback((id: string) => {
    setCompareIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < MAX_COMPARE
        ? [...prev, id]
        : prev;
      try { localStorage.setItem(COMPARE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    save([]);
  }, [save]);

  return { compareIds, add, remove, toggle, clear, count: compareIds.length, isFull: compareIds.length >= MAX_COMPARE };
}
