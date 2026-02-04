/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/chat',
        destination: '/agents',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
