/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    NEXT_PUBLIC_APP_SERVER_URL: process.env.NEXT_PUBLIC_APP_SERVER_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4200/api/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:4200/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;
