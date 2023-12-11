/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mui/x-charts'],
  images: {
    domains: ['gymrat-bucket.s3.ap-southeast-2.amazonaws.com'],
  }
}

module.exports = nextConfig
