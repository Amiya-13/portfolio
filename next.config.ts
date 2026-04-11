import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  devIndicators: {
    buildActivity: false,
  },
};

export default nextConfig;
