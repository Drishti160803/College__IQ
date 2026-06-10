"use client";
import { notFound } from "next/navigation";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCollegeById } from "@/lib/utils";
import { formatCurrency, formatPackage, getRatingColor, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";

export default function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const college = getCollegeById(id);
  if (!college) notFound();

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "courses", label: "Courses & Fees" },
    { id: "placements", label: "Placements" },
    { id: "cutoffs", label: "Cutoffs" },
    { id: "reviews", label: `Reviews (${college.reviews.length})` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/colleges" className="hover:text-blue-600">Colleges</Link>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span className="text-slate-800 font-medium truncate">{college.shortName}</span>
      </nav>

      {/* Hero card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-6">
        <div className="relative h-52 md:h-64 bg-gradient-to-br from-blue-200 to-indigo-100">
          <Image src={college.image} alt={college.name} fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 text-white flex items-end justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant={college.type === "Government" ? "success" : "blue"}>{college.type}</Badge>
                {college.ranking.nirf && (
                  <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                    NIRF #{college.ranking.nirf}
                  </span>
                )}
              </div>
              <h1 className="text-xl md:text-2xl font-bold leading-tight">{college.name}</h1>
              <p className="text-white/80 text-sm mt-0.5 flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 1C5.24 1 3 3.24 3 6c0 4 5 9 5 9s5-5 5-9c0-2.76-2.24-5-5-5z" fill="currentColor"/></svg>
                {college.location.city}, {college.location.state} · Est. {college.established}
              </p>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-y sm:divide-y-0 divide-slate-100">
          {[
            { label: "Rating", value: <span className={cn("text-base font-bold px-2 py-0.5 rounded", getRatingColor(college.rating))}>{college.rating}★</span> },
            { label: "B.Tech Fees/yr", value: college.fees.btech ? formatCurrency(college.fees.btech) : "—" },
            { label: "Avg Package", value: formatPackage(college.placements.averagePackage) },
            { label: "Placement %", value: `${college.placements.placementRate}%` },
          ].map((s) => (
            <div key={s.label} className="px-5 py-4 text-center">
              <p className="text-xs text-slate-500 mb-1">{s.label}</p>
              {typeof s.value === "string" ? (
                <p className="font-bold text-slate-900">{s.value}</p>
              ) : s.value}
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <Tabs tabs={tabs}>
          {(active) => (
            <div className="p-5 md:p-6">
              {/* OVERVIEW */}
              {active === "overview" && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <h2 className="font-bold text-slate-900 text-lg mb-3">About</h2>
                    <p className="text-slate-600 leading-relaxed">{college.description}</p>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h2 className="font-bold text-slate-900 text-lg mb-3">Highlights</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {college.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2.5 bg-green-50 border border-green-100 rounded-lg px-4 py-3">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-green-600 shrink-0">
                            <circle cx="8" cy="8" r="7" fill="#dcfce7"/>
                            <path d="M5 8l2.5 2.5L11 6" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-sm font-medium text-slate-700">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Accreditations */}
                  <div>
                    <h2 className="font-bold text-slate-900 text-lg mb-3">Accreditations</h2>
                    <div className="flex flex-wrap gap-2">
                      {college.accreditation.map((a) => (
                        <Badge key={a} variant="blue" size="md">{a}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Facilities */}
                  <div>
                    <h2 className="font-bold text-slate-900 text-lg mb-3">Facilities</h2>
                    <div className="flex flex-wrap gap-2">
                      {college.facilities.map((f) => (
                        <Badge key={f} variant="outline" size="md">
                          <span className="mr-1">✓</span>{f}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* COURSES */}
              {active === "courses" && (
                <div className="animate-fade-in">
                  <h2 className="font-bold text-slate-900 text-lg mb-4">Available Courses</h2>
                  <div className="overflow-x-auto -mx-2">
                    <table className="w-full min-w-[550px] text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          {["Course", "Duration", "Seats", "Annual Fee", "Eligibility"].map((h) => (
                            <th key={h} className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {college.courses.map((c, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-medium text-slate-900">{c.name}</td>
                            <td className="px-4 py-3 text-slate-600">{c.duration}</td>
                            <td className="px-4 py-3 text-slate-600">{c.seats}</td>
                            <td className="px-4 py-3 font-semibold text-blue-700">{formatCurrency(c.fees)}</td>
                            <td className="px-4 py-3"><Badge variant="outline">{c.eligibility}</Badge></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* PLACEMENTS */}
              {active === "placements" && (
                <div className="animate-fade-in space-y-6">
                  <h2 className="font-bold text-slate-900 text-lg">Placement Statistics (2024)</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Placement Rate", value: `${college.placements.placementRate}%`, icon: "🎓", color: "bg-green-50 border-green-200" },
                      { label: "Average Package", value: formatPackage(college.placements.averagePackage), icon: "💰", color: "bg-blue-50 border-blue-200" },
                      { label: "Median Package", value: formatPackage(college.placements.medianPackage), icon: "📊", color: "bg-purple-50 border-purple-200" },
                      { label: "Highest Package", value: formatPackage(college.placements.highestPackage), icon: "🚀", color: "bg-amber-50 border-amber-200" },
                    ].map((s) => (
                      <div key={s.label} className={cn("border rounded-xl p-4 text-center", s.color)}>
                        <div className="text-2xl mb-2">{s.icon}</div>
                        <p className="font-bold text-slate-900 text-lg">{s.value}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-3">Top Recruiters</h3>
                    <div className="flex flex-wrap gap-2">
                      {college.placements.topRecruiters.map((r) => (
                        <span key={r} className="bg-white border border-slate-200 text-slate-700 text-sm font-medium px-4 py-2 rounded-lg shadow-sm">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CUTOFFS */}
              {active === "cutoffs" && (
                <div className="animate-fade-in">
                  <h2 className="font-bold text-slate-900 text-lg mb-4">Admission Cutoffs 2024</h2>
                  <div className="overflow-x-auto -mx-2">
                    <table className="w-full min-w-[460px] text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          {["Exam", "Branch", "Category", "Closing Rank / Percentile"].map((h) => (
                            <th key={h} className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {college.cutoffs.map((c, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="px-4 py-3"><Badge variant="blue">{c.exam}</Badge></td>
                            <td className="px-4 py-3 font-medium text-slate-800">{c.branch ?? "All"}</td>
                            <td className="px-4 py-3">
                              <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full",
                                c.category === "General" ? "bg-slate-100 text-slate-700" :
                                c.category === "OBC" ? "bg-orange-100 text-orange-700" :
                                "bg-purple-100 text-purple-700"
                              )}>{c.category}</span>
                            </td>
                            <td className="px-4 py-3 font-bold text-slate-900">{c.rank.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
                    ⚠️ Cutoffs are indicative. Actual cutoffs may vary based on seat availability, category, and institute preference.
                  </div>
                </div>
              )}

              {/* REVIEWS */}
              {active === "reviews" && (
                <div className="animate-fade-in space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-slate-900 text-lg">Student Reviews</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-extrabold text-slate-900">{college.rating}</span>
                      <div>
                        <StarRating rating={college.rating} showValue={false} />
                        <p className="text-xs text-slate-400 mt-0.5">{college.reviewCount.toLocaleString()} reviews</p>
                      </div>
                    </div>
                  </div>
                  {college.reviews.map((r) => (
                    <div key={r.id} className="border border-slate-200 rounded-xl p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                          {r.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-slate-900 text-sm">{r.author}</p>
                            <Badge variant="outline" size="sm">{r.course}</Badge>
                            <Badge variant="default" size="sm">Batch {r.batch}</Badge>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <StarRating rating={r.rating} size="sm" />
                            <span className="text-xs text-slate-400">{new Date(r.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-slate-800 mb-2">{r.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed mb-3">{r.content}</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="bg-green-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-green-700 mb-1.5">👍 Pros</p>
                          <ul className="space-y-1">
                            {r.pros.map((p) => <li key={p} className="text-xs text-green-800">• {p}</li>)}
                          </ul>
                        </div>
                        <div className="bg-red-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-red-700 mb-1.5">👎 Cons</p>
                          <ul className="space-y-1">
                            {r.cons.map((c) => <li key={c} className="text-xs text-red-800">• {c}</li>)}
                          </ul>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-3">{r.helpful} people found this helpful</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Tabs>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <Link href="/compare">
          <Button variant="outline">Compare with Others</Button>
        </Link>
        <Link href="/predictor">
          <Button variant="secondary">Check My Chances</Button>
        </Link>
      </div>
    </div>
  );
}
