import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Voices & Sounds became the prebuilt Agents page.
      { source: "/voices", destination: "/agents", permanent: true },
    ]
  },
}

export default nextConfig
