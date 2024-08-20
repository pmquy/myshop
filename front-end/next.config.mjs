/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_USER_SERVICE: process.env.NEXT_PUBLIC_USER_SERVICE,
    NEXT_PUBLIC_PAGE_SERVICE: process.env.NEXT_PUBLIC_PAGE_SERVICE,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  }
};

export default nextConfig;
