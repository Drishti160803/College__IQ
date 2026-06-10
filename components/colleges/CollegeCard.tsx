"use client";
import Link from "next/link";
import Image from "next/image";
import { College } from "@/types";
import { formatCurrency, formatPackage, getRatingColor, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";

interface CollegeCardProps {
  college: College;
  onCompare?: (id: string) => void;
  isInCompare?: boolean;
  compareDisabled?: boolean;
}

export function CollegeCard({ college, onCompare, isInCompare, compareDisabled }: CollegeCardProps) {
  const ratingColor = getRatingColor(college.rating);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden card-hover animate-fade-in flex flex-col">
      {/* Image */}
      <div className="relative h-40 bg-gradient-to-br from-blue-100 to-blue-50 overflow-hidden">
        <Image
          src={college.image}
          alt={college.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={college.type === "Government" ? "success" : college.type === "Deemed" ? "blue" : "outline"}>
            {college.type}
          </Badge>
        </div>
        {/* NIRF rank */}
        {college.ranking.nirf && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-bold text-slate-700">
            NIRF #{college.ranking.nirf}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          {/* Name */}
          <Link href={`/college/${college.id}`} className="hover:text-blue-600 transition-colors">
            <h3 className="font-semibold text-slate-900 text-base leading-snug line-clamp-2 mb-1">
              {college.name}
            </h3>
          </Link>

          {/* Location */}
          <p className="text-slate-500 text-sm flex items-center gap-1 mb-2">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M8 1C5.24 1 3 3.24 3 6c0 4 5 9 5 9s5-5 5-9c0-2.76-2.24-5-5-5z" fill="currentColor" />
            </svg>
            {college.location.city}, {college.location.state}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded", ratingColor)}>
              {college.rating}★
            </span>
            <span className="text-xs text-slate-400">{college.reviewCount.toLocaleString()} reviews</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-slate-50 rounded-lg p-2 text-center">
              <p className="text-xs text-slate-500 mb-0.5">B.Tech Fee</p>
              <p className="text-sm font-bold text-slate-800">
                {college.fees.btech ? formatCurrency(college.fees.btech) : "—"}
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-2 text-center">
              <p className="text-xs text-slate-500 mb-0.5">Avg Package</p>
              <p className="text-sm font-bold text-slate-800">
                {formatPackage(college.placements.averagePackage)}
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-2 text-center">
              <p className="text-xs text-slate-500 mb-0.5">Placement</p>
              <p className="text-sm font-bold text-slate-800">
                {college.placements.placementRate}%
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {college.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-slate-100">
          <Link href={`/college/${college.id}`} className="flex-1">
            <Button variant="primary" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          {onCompare && (
            <Button
              variant={isInCompare ? "danger" : "outline"}
              size="sm"
              onClick={() => onCompare(college.id)}
              disabled={!isInCompare && compareDisabled}
              title={compareDisabled && !isInCompare ? "Max 3 colleges in compare" : ""}
              className="shrink-0"
            >
              {isInCompare ? (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8h12M8 2v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              )}
              Compare
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
