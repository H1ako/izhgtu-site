/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    console.log(1)
    return [
      {
        source: '/assets/:path*',
        destination: 'http://127.0.0.1:8000/assets/:path*'
      }
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
