import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "CollegeIQ — Discover Your College",
  description: "Search, compare, and predict your best-fit engineering and management colleges in India.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-slate-50">
        <Navbar />
        <main>{children}</main>
        <footer className="mt-16 border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 font-bold text-blue-600 mb-3 text-lg">
                  <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                    <rect width="28" height="28" rx="8" fill="#1d4ed8"/>
                    <path d="M7 20l5-12 5 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.5 15h5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="21" cy="10" r="3" fill="#f97316"/>
                  </svg>
                  CollegeIQ
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">Your AI-powered guide to finding the perfect college in India.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-3 text-sm">Explore</p>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><a href="/colleges" className="hover:text-blue-600">All Colleges</a></li>
                  <li><a href="/compare" className="hover:text-blue-600">Compare</a></li>
                  <li><a href="/predictor" className="hover:text-blue-600">Predictor Tool</a></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-3 text-sm">Exams</p>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li>JEE Advanced</li><li>JEE Main</li><li>CAT</li><li>BITSAT</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-3 text-sm">About</p>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li>About Us</li><li>Contact</li><li>Privacy Policy</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
              © 2025 CollegeIQ. Built for student success.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
