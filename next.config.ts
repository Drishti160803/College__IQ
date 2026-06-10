import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Tells Next.js to compile into static HTML/CSS/JS
  images: {
    unoptimized: true, // Required for static export to handle Unsplash images
    remotePatterns: [
      { 
        protocol: "https", 
        hostname: "images.unsplash.com" 
      },
    ],
  },
};

export default nextConfig;

