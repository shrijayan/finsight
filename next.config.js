/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  transpilePackages: ["lib", "db"],
  eslint: {
    dirs: ['src']
  }
}

module.exports = nextConfig
