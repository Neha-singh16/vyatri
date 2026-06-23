import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/home/HeroSection'
import DestinationsStrip from '@/components/home/DestinationsStrip'
import FeaturedTrips from '@/components/home/FeaturedTrips'
import StatsSection from '@/components/home/StatsSection'
import TrustBadges from '@/components/home/TrustBadges'
import tripsData from '@/data/trips.json'
import type { Trip } from '@/lib/types'

// Below-fold components — lazy loaded for faster initial paint
const UpcomingDepartures = dynamic(() => import('@/components/home/UpcomingDepartures'), { ssr: true })
const WhyVyatri          = dynamic(() => import('@/components/home/WhyVyatri'), { ssr: true })
const Testimonials       = dynamic(() => import('@/components/home/Testimonials'), { ssr: true })
const FAQSection         = dynamic(() => import('@/components/home/FAQSection'), { ssr: true })

const BASE = 'https://vyatri.in'

export const metadata: Metadata = {
  title: 'Vyatri Trip Planner | Group Adventure Trips from Delhi — From ₹4,999',
  description: 'Curated group adventure trips from Delhi NCR — Spiti Valley, Bhutan, Thailand, Rajasthan & more. Solo-friendly backpacking. Starting ₹4,999.',
  alternates: { canonical: BASE },
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': BASE,
  name: 'Vyatri Trip Planner',
  url: BASE,
  telephone: '+91-87002-89516',
  email: 'hello@vyatri.in',
  priceRange: '₹₹',
  image: `${BASE}/og-image.jpg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'B-24, Connaught Place',
    addressLocality: 'New Delhi',
    addressRegion: 'Delhi',
    postalCode: '110001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.6315,
    longitude: 77.2167,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    bestRating: '5',
    reviewCount: '856',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '20:00',
  },
}

export default function HomePage() {
  const trips = tripsData as Trip[]
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <HeroSection />
      <StatsSection />
      <DestinationsStrip />
      <FeaturedTrips trips={trips} />
      <UpcomingDepartures trips={trips} />
      <WhyVyatri />
      <Testimonials />
      <FAQSection />
    </>
  )
}
