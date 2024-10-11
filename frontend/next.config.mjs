/** @type {import('next').NextConfig} */

import TerserPlugin from "terser-webpack-plugin";

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
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
  productionBrowserSourceMaps: false,
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
