import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
