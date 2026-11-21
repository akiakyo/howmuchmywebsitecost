import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `npm run build` outputs plain files to /out,
  // so it can be hosted anywhere (Cloudflare Pages, GitHub Pages, Netlify...).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
