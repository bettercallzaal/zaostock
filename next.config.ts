import type { NextConfig } from 'next';

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'imgur.com' },
      { protocol: 'https', hostname: 'i.postimg.cc' },
      { protocol: 'https', hostname: 'postimg.cc' },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // donate.zaostock.com -> /donate
        {
          source: '/',
          destination: '/donate',
          has: [{ type: 'host', value: 'donate.zaostock.com' }],
        },
        {
          source: '/:path*',
          destination: '/donate/:path*',
          has: [{ type: 'host', value: 'donate.zaostock.com' }],
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default config;
