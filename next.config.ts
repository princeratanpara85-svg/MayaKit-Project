import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/components/[slug]": ["./src/components/library/**/*", "./src/components/ui/**/*", "./src/components/three/**/*"],
  },
};

export default nextConfig;
