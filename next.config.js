const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "~@styles/abstracts/_variables.scss";`,
  },
  images: {
    loader: "akamai",
    path: "",
  },
  // basePath: '/jacques-altounian/retina-to-html',
  assetPrefix: "/_next/static",
};

module.exports = nextConfig;
