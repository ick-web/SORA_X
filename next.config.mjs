/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "rxwsgcailvsrbefcdnyv.supabase.co",
        port: "",
        pathname: "**",
      }
    ],
  },
};

export default nextConfig;
