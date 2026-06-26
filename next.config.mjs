import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "dist",
  basePath:
    process.env.NODE_ENV === "production"
      ? process.env.EXPORT_BASE_PATH ?? "/hungun-tsagaan-hiits"
      : "",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_ERXES_ENDPOINT: "https://bkhishigbyamba.next.erxes.io/gateway/graphql",
    NEXT_PUBLIC_ERXES_APP_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRQb3J0YWxJZCI6InpBdjN6Wmc5bElrYnFBOWFvZXhFOSIsImlhdCI6MTc4MjIxNTM5Nn0.UMxTc4OmsAs004NeBOG8qDxhRzm1gMv-NZGm4WeM5-Y",
    NEXT_PUBLIC_ERXES_CMS_ID: "6a3a75e9407ef915c5097a0c",
    ERXES_APP_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRQb3J0YWxJZCI6InpBdjN6Wmc5bElrYnFBOWFvZXhFOSIsImlhdCI6MTc4MjIxNTM5Nn0.UMxTc4OmsAs004NeBOG8qDxhRzm1gMv-NZGm4WeM5-Y",
  },
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
