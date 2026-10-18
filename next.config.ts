import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // All images are local files in /public. Add `images.remotePatterns` before using a remote image.
};

export default withNextIntl(nextConfig);
