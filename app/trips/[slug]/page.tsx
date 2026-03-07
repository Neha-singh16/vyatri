import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import TripDetailClient from './TripDetailClient'
import tripsData from '@/data/trips.json'
import type { Trip } from '@/lib/types'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const trip = (tripsData as Trip[]).find((t) => t.slug === params.slug)
  if (!trip) return {}
  return {
    title: `${trip.title} | ${trip.duration} from Delhi`,
    description: trip.description.slice(0, 160),
    openGraph: {
      images: [trip.image],
    },
  }
}

export function generateStaticParams() {
  return (tripsData as Trip[]).map((t) => ({ slug: t.slug }))
}

export default function TripDetailPage({ params }: { params: { slug: string } }) {
  const trip = (tripsData as Trip[]).find((t) => t.slug === params.slug)
  if (!trip) notFound()

  const related = (tripsData as Trip[])
    .filter((t) => t.id !== trip.id && t.category === trip.category)
    .slice(0, 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            "name": trip.title,
            "description": trip.description,
            "image": trip.image,
            "touristType": "Adventure",
            "offers": {
              "@type": "Offer",
              "price": trip.price,
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
            },
            "provider": {
              "@type": "TravelAgency",
              "name": "Vyatri Trip Planner",
            },
          })
        }}
      />
      <TripDetailClient trip={trip} related={related} />
    </>
  )
}
