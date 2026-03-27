import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Output standalone untuk production deployment
  output: "standalone",

  // Fix warning multiple lockfiles - arahkan ke folder frontend
  outputFileTracingRoot: path.join(__dirname),

  // React Compiler (disabled dulu, bisa re-enable setelah jalan)
  // reactCompiler: true,

  // Experimental
  experimental: {
    // reactCompiler: true, // aktifkan di sini kalau mau coba lagi
  },

  // Environment variables
  env: {},

  // Gambar tidak dioptimasi (kompatibel dengan standalone)
  images: {
    unoptimized: true,
  },

  // basePath: '',
  // trailingSlash: false,

  // Webpack configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;