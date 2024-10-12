/** @type {import('next').NextConfig} */

import TerserPlugin from 'terser-webpack-plugin';
import withPWA from 'next-pwa'; 

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // Remove console.log statements
            },
            format: {
              comments: false, // Remove comments
            },
          },
          extractComments: false,
        })
      );
    }
    return config;
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

// Use the ES module syntax to apply PWA config on top of nextConfig
const pwaConfig = withPWA({
  dest: 'public', // This is where the service worker will be generated
  register: true,
  skipWaiting: true,
});

export default {
  ...pwaConfig,
  ...nextConfig,
};
