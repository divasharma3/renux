/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "renux.vercel.app",
      },
    ],
  },
};

export default nextConfig;
