import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  async headers() {
    return [
      {
        source: '/telegram',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
        ],
      },
    ];
  },
  allowedDevOrigins: [
    'http://192.168.0.*:3020',
    'http://192.168.1.*:3020',
    'http://10.*.*.*:3020',
    'http://172.16.*.*:3020',
    'http://localhost:3020',
  ],
};

export default nextConfig;
