"use client";
import { useState, useMemo, useCallback } from "react";
import { FilterState } from "@/types";
import { filterColleges } from "@/lib/utils";

const defaultFilters: FilterState = {
  query: "",
  states: [],
  types: [],
  feeMin: 0,
  feeMax: 2000000,
  ratingMin: 0,
  exams: [],
  courses: [],
  sort: "rating",
};

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const results = useMemo(() => filterColleges(filters), [filters]);

  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleArrayFilter = useCallback(<K extends keyof FilterState>(key: K, value: string) => {
    setFilters((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value],
      };
    });
  }, []);

  const reset = useCallback(() => setFilters(defaultFilters), []);

  const activeCount = useMemo(() => {
    let n = 0;
    if (filters.states.length) n++;
    if (filters.types.length) n++;
    if (filters.feeMax < 2000000) n++;
    if (filters.ratingMin > 0) n++;
    if (filters.exams.length) n++;
    return n;
  }, [filters]);

  return { filters, updateFilter, toggleArrayFilter, reset, results, activeCount };
}
