require("dotenv/config");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE !== undefined,
});

module.exports = withBundleAnalyzer({
  env: {
    DOMAIN: process.env.DOMAIN,
  },
  target: "server",
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*",
      },
    ];
  },
});
