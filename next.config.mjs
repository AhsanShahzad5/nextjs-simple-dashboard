/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: "images.pexels.com",
          },
          {
              protocol: 'https',
              hostname: "example.com", // Correctly only include the domain
              pathname: "/img/**", // Match all images under /img/
          },
      ],
  },
};

export default nextConfig;
