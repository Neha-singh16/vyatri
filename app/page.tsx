import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/home/HeroSection'
import DestinationsStrip from '@/components/home/DestinationsStrip'
import FeaturedTrips from '@/components/home/FeaturedTrips'
import tripsData from '@/data/trips.json'
import type { Trip } from '@/lib/types'

// Below-fold components — lazy loaded for faster initial paint
const UpcomingDepartures = dynamic(() => import('@/components/home/UpcomingDepartures'), { ssr: true })
const WhyVyatri          = dynamic(() => import('@/components/home/WhyVyatri'), { ssr: true })
const Testimonials       = dynamic(() => import('@/components/home/Testimonials'), { ssr: true })
const FAQSection         = dynamic(() => import('@/components/home/FAQSection'), { ssr: true })

export const metadata: Metadata = {
  title: 'Vyatri Trip Planner | Group Adventure Trips from Delhi — From ₹4,999',
  description: 'Curated group adventure trips from Delhi NCR — Spiti Valley, Bhutan, Thailand, Rajasthan & more. Solo-friendly backpacking. Starting ₹4,999.',
  alternates: { canonical: 'https://vyatri.in' },
}

export default function HomePage() {
  const trips = tripsData as Trip[]
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context':'https://schema.org','@type':'TravelAgency',
        name:'Vyatri Trip Planner',url:'https://vyatri.in',
        telephone:'+91-98765-43210',email:'hello@vyatri.in',
        address:{'@type':'PostalAddress',streetAddress:'B-24, Connaught Place',addressLocality:'New Delhi',postalCode:'110001',addressCountry:'IN'},
        aggregateRating:{'@type':'AggregateRating',ratingValue:'4.9',reviewCount:'856'},
      })}} />
      <HeroSection />
      <DestinationsStrip />
      <FeaturedTrips trips={trips} />
      <UpcomingDepartures trips={trips} />
      <WhyVyatri />
      <Testimonials />
      <FAQSection />
    </>
  )
}
