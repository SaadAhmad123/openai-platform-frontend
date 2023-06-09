/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BUILD: process.env.BUILD,
    REGION: process.env.REGION,
    COGNITO_USERPOOL_CLIENT_ID: process.env.COGNITO_USERPOOL_CLIENT_ID,
    REST_API_BASE_URL: process.env.REST_API_BASE_URL,
  },
}

module.exports = nextConfig
