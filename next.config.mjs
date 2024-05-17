/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'server.lockleaks.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
