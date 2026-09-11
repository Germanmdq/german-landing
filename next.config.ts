import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  devIndicators: false,
  allowedDevOrigins: [
    'http://192.168.0.*:3020',
    'http://192.168.1.*:3020',
    'http://10.*.*.*:3020',
    'http://172.16.*.*:3020',
    'http://localhost:3020',
  ],
};

export default nextConfig;
