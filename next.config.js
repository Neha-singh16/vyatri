/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    deviceSizes: [375, 640, 750, 828, 1080, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      { protocol:'https', hostname:'images.unsplash.com' },
      { protocol:'https', hostname:'plus.unsplash.com' },
    ],
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key:'X-Content-Type-Options', value:'nosniff' },
        { key:'X-Frame-Options', value:'DENY' },
        { key:'Referrer-Policy', value:'strict-origin-when-cross-origin' },
        { key:'Permissions-Policy', value:'camera=(), microphone=(), geolocation=()' },
      ],
    },
    {
      source: '/(.*)\\.(js|css|woff2?|ttf|otf|eot|svg|ico|png|jpg|jpeg|webp|avif)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    }]
  },
}
module.exports = nextConfig
