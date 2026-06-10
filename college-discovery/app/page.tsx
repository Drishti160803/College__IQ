import Link from "next/link";
import { colleges } from "@/lib/data";
import { formatPackage, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

const stats = [
  { value: "500+", label: "Colleges Listed" },
  { value: "50+", label: "Entrance Exams" },
  { value: "10L+", label: "Students Helped" },
  { value: "98%", label: "Accuracy Rate" },
];

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="#1d4ed8" strokeWidth="2"/>
        <path d="M16.5 16.5L21 21" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Smart Search",
    desc: "Filter by exam, fees, rating, location and more to find your perfect match instantly.",
    href: "/colleges",
    cta: "Search Colleges",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="7" height="14" rx="2" stroke="#1d4ed8" strokeWidth="2"/>
        <rect x="14" y="5" width="7" height="14" rx="2" stroke="#1d4ed8" strokeWidth="2"/>
      </svg>
    ),
    title: "Side-by-Side Compare",
    desc: "Compare up to 3 colleges across fees, placements, rankings and facilities in one view.",
    href: "/compare",
    cta: "Compare Now",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#1d4ed8" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#1d4ed8" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Admission Predictor",
    desc: "Enter your rank and exam to instantly see your admission chances at top colleges.",
    href: "/predictor",
    cta: "Predict Colleges",
  },
];

export default function HomePage() {
  const topColleges = colleges.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
              Updated for 2024-25 Admissions
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Find Your Dream<br />
              <span className="text-amber-400">College in India</span>
            </h1>
            <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
              Search 500+ colleges, compare rankings and placements, predict admission chances — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/colleges"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors text-base shadow-lg"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Explore Colleges
              </Link>
              <Link
                href="/predictor"
                className="inline-flex items-center justify-center gap-2 bg-amber-400 text-slate-900 font-semibold px-6 py-3 rounded-xl hover:bg-amber-300 transition-colors text-base shadow-lg"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
                Predict My College
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold text-blue-700 mb-1">{s.value}</p>
                <p className="text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Everything You Need to Decide</h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">Three powerful tools designed to make your college search confident and data-driven.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white border border-slate-200 rounded-2xl p-6 card-hover">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">{f.desc}</p>
              <Link
                href={f.href}
                className="inline-flex items-center gap-1.5 text-blue-600 font-semibold text-sm hover:gap-2.5 transition-all"
              >
                {f.cta}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Top Colleges */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Top Colleges</h2>
              <p className="text-slate-500 mt-1 text-sm">Ranked by NIRF and placement performance</p>
            </div>
            <Link href="/colleges" className="text-blue-600 font-semibold text-sm hover:text-blue-700 flex items-center gap-1">
              View all
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          <div className="grid gap-4">
            {topColleges.map((college, i) => (
              <Link
                key={college.id}
                href={`/college/${college.id}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors truncate">{college.name}</h3>
                    <Badge variant={college.type === "Government" ? "success" : "blue"} size="sm">{college.type}</Badge>
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{college.location.city}, {college.location.state}</p>
                </div>
                <div className="hidden sm:flex items-center gap-6 shrink-0 text-center">
                  <div>
                    <p className="text-xs text-slate-400">Avg Package</p>
                    <p className="font-bold text-slate-800 text-sm">{formatPackage(college.placements.averagePackage)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Fees/yr</p>
                    <p className="font-bold text-slate-800 text-sm">{college.fees.btech ? formatCurrency(college.fees.btech) : "—"}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                    <span className="text-sm font-bold text-amber-600">{college.rating}★</span>
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-slate-400 group-hover:text-blue-600 shrink-0">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Know Your Rank? Predict Your College.</h2>
            <p className="text-blue-200 max-w-md">Enter your JEE / CAT / BITSAT rank and get personalized college recommendations with admission probability.</p>
          </div>
          <Link
            href="/predictor"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors text-base shadow-lg"
          >
            Try Predictor
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
