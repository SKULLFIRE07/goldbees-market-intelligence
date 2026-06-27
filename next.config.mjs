/** @type {import('next').NextConfig} */

// Repository name — used as the base path when the site is served from
// https://<user>.github.io/<repo>/ on GitHub Pages.
const repo = "goldbees-market-intelligence";
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // Emit a fully static site into ./out so it can be hosted on GitHub Pages.
  output: "export",
  // GitHub Pages serves project sites under /<repo>; locally we serve at root.
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  // next/image optimisation needs a server; disable it for static export.
  images: { unoptimized: true },
  // Emit /path/index.html so deep links resolve on a static host.
  trailingSlash: true,
};

export default nextConfig;
