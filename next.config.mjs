/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    tsconfigPath: process.env.NODE_ENV === "test" ? "tsconfig.test.json" : "tsconfig.json",
  },
};

export default nextConfig;
