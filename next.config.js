/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API: "https://endo-api.eductor.org",
  },
  images: {
    loader: "custom",
    loaderFile: "./src/config/image.loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "endo-api.eductor.org",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.youtube.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
