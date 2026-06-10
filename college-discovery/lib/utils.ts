import { College, FilterState, PredictorInput, PredictorResult } from "@/types";
import { colleges } from "./data";

export function formatCurrency(amount: number): string {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
}

export function formatPackage(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} LPA`;
  return `₹${amount}`;
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function filterColleges(filters: FilterState): College[] {
  let result = [...colleges];

  if (filters.query.trim()) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.shortName.toLowerCase().includes(q) ||
        c.location.city.toLowerCase().includes(q) ||
        c.location.state.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filters.states.length > 0) {
    result = result.filter((c) => filters.states.includes(c.location.state));
  }

  if (filters.types.length > 0) {
    result = result.filter((c) => filters.types.includes(c.type));
  }

  if (filters.feeMax > 0) {
    result = result.filter((c) => c.fees.btech ? c.fees.btech <= filters.feeMax : true);
  }

  if (filters.ratingMin > 0) {
    result = result.filter((c) => c.rating >= filters.ratingMin);
  }

  if (filters.exams.length > 0) {
    result = result.filter((c) =>
      c.cutoffs.some((cut) => filters.exams.includes(cut.exam))
    );
  }

  switch (filters.sort) {
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "fees_low":
      result.sort((a, b) => (a.fees.btech ?? 0) - (b.fees.btech ?? 0));
      break;
    case "fees_high":
      result.sort((a, b) => (b.fees.btech ?? 0) - (a.fees.btech ?? 0));
      break;
    case "placement":
      result.sort(
        (a, b) =>
          b.placements.averagePackage - a.placements.averagePackage
      );
      break;
    case "ranking":
      result.sort(
        (a, b) => (a.ranking.nirf ?? 999) - (b.ranking.nirf ?? 999)
      );
      break;
  }

  return result;
}

export function getCollegeById(id: string): College | undefined {
  return colleges.find((c) => c.id === id);
}

export function predictColleges(input: PredictorInput): PredictorResult[] {
  const results: PredictorResult[] = [];

  for (const college of colleges) {
    const matchingCutoffs = college.cutoffs.filter(
      (c) =>
        c.exam === input.exam &&
        (input.category === "General" ? c.category === "General" : c.category === input.category || c.category === "General")
    );

    if (matchingCutoffs.length === 0) continue;

    for (const cutoff of matchingCutoffs) {
      let chance: "High" | "Medium" | "Low";
      const ratio = input.rank / cutoff.rank;

      if (ratio <= 0.7) chance = "High";
      else if (ratio <= 1.1) chance = "Medium";
      else if (ratio <= 1.5) chance = "Low";
      else continue;

      results.push({
        college,
        chance,
        cutoffRank: cutoff.rank,
        branch: cutoff.branch ?? "General",
      });
    }
  }

  // Sort: High > Medium > Low, then by ratio
  const order = { High: 0, Medium: 1, Low: 2 };
  results.sort((a, b) => order[a.chance] - order[b.chance]);

  return results.slice(0, 15);
}

export function getRatingColor(rating: number): string {
  if (rating >= 4.5) return "text-green-600 bg-green-50";
  if (rating >= 4.0) return "text-blue-600 bg-blue-50";
  if (rating >= 3.5) return "text-yellow-600 bg-yellow-50";
  return "text-red-600 bg-red-50";
}

export function getChanceColor(chance: "High" | "Medium" | "Low"): string {
  if (chance === "High") return "text-green-700 bg-green-100 border-green-200";
  if (chance === "Medium") return "text-yellow-700 bg-yellow-100 border-yellow-200";
  return "text-red-700 bg-red-100 border-red-200";
}
