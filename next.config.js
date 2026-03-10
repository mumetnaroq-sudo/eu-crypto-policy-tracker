/** @type {import('next').NextConfig} */
const nextConfig = {
  // SSR configuration for Vercel (enables API routes)
  trailingSlash: true,
  // Disable image optimization for compatibility
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
