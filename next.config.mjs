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
<<<<<<< HEAD
      }
=======
      },
>>>>>>> 7e67696df5dd68507a4099ff0b483738ad14ae2a
    ],
  },
};

export default nextConfig;
