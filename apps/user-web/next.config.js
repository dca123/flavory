/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    serverActions: true,
    swcPlugins: ["@swc-jotai/react-refresh", {}],
  },
};

module.exports = nextConfig;
