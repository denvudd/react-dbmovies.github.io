const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // for development period on Vercel (link: https://vercel.com/docs/concepts/image-optimization/managing-image-optimization-costs#how-to-minimize-image-optimization-costs)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
    ],
  },
};

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = withBundleAnalyzer(nextConfig)