import type { Metadata, Viewport } from 'next'
import { Poppins, Syne } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import ScrollProgressBar from '@/components/shared/ScrollProgressBar'
import dynamic from 'next/dynamic'

const ExitIntentPopup = dynamic(() => import('@/components/shared/ExitIntentPopup'), { ssr: false })

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
  variable: '--font-syne',
})

export const viewport: Viewport = {
  themeColor: '#ff6b1a',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://vyatri.in'),
  title: {
    default: 'Vyatri Trip Planner | Group Adventure Trips from Delhi',
    template: '%s | Vyatri Trip Planner',
  },
  description: 'Vyatri Trip Planner offers curated group adventure trips from Delhi — Spiti Valley, Bhutan, Thailand, Rajasthan & more. Affordable backpacking from ₹4,999.',
  keywords: 'group trips from delhi, backpacking india, adventure travel, spiti valley trip, bhutan tour, thailand package, weekend getaways delhi',
  authors: [{ name: 'Vyatri Trip Planner' }],
  alternates: {
    canonical: 'https://vyatri.in',
  },
  openGraph: {
    title: 'Vyatri Trip Planner | Group Adventure Trips from Delhi',
    description: 'Curated group adventure trips for solo travelers — Domestic & International backpacking from ₹4,999.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://vyatri.in',
    siteName: 'Vyatri Trip Planner',
    images: [{
      url: 'https://vyatri.in/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Vyatri Trip Planner — Group Adventure Trips from Delhi',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vyatri Trip Planner | Group Adventure Trips from Delhi',
    description: 'Group adventure trips from Delhi — starting ₹4,999',
    images: ['https://vyatri.in/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${poppins.variable} ${syne.variable}`}>
      <head>
        {/* Preconnect Unsplash CDN */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={`${poppins.className} antialiased`} style={{ background:'#f7f3ef' }}>
        <ScrollProgressBar />
        <Navbar />
        {/* pt-* offsets fixed navbar on non-hero pages; hero section compensates with -mt-* */}
        <main id="main-content" className="pt-[60px] sm:pt-[64px] lg:pt-[72px]">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ExitIntentPopup />
      </body>
    </html>
  )
}
