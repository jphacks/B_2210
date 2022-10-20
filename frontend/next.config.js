/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.dog.ceo', 'aicon-maker-backend.herokuapp.com'],
  },
}

module.exports = nextConfig
