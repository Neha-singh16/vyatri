import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import TripDetailClient from './TripDetailClient'
import tripsData from '@/data/trips.json'
import type { Trip } from '@/lib/types'

const BASE = 'https://vyatri.in'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const trip = (tripsData as Trip[]).find((t) => t.slug === params.slug)
  if (!trip) return {}

  // Title format: "[Trip Name] [Duration] | From ₹[Price] — Vyatri" — keep under 60 chars
  const rawTitle = `${trip.title} ${trip.duration} | From ₹${trip.price.toLocaleString('en-IN')}`
  const title = rawTitle.length > 55 ? rawTitle.slice(0, 55) + '…' : rawTitle

  // Description: under 155 chars
  const highlights = trip.highlights.slice(0, 2).join(', ')
  const rawDesc = `${trip.subtitle.split('·')[0].trim()}, ${highlights}. Book ${trip.duration} guided trek from ₹${trip.price.toLocaleString('en-IN')}. Solo-friendly, expert guides. Limited seats.`
  const description = rawDesc.length > 150 ? rawDesc.slice(0, 150) + '…' : rawDesc

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE}/trips/${trip.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE}/trips/${trip.slug}`,
      images: [{ url: trip.image, width: 1200, height: 630, alt: `${trip.title} group trip in ${trip.subtitle.split('·')[0].trim()}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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

  // Build itinerary as ItemList for JSON-LD
  const itineraryItemList = {
    '@type': 'ItemList',
    itemListElement: trip.itinerary.map((day, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Day ${day.day}: ${day.title}`,
      description: day.desc,
    })),
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: trip.title,
    description: trip.description,
    image: trip.image,
    touristType: 'Adventure',
    offers: {
      '@type': 'Offer',
      price: trip.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: trip.startDate,
    },
    itinerary: itineraryItemList,
    organizer: {
      '@type': 'Organization',
      name: 'Vyatri Trip Planner',
      url: BASE,
      telephone: '+91-87002-89516',
      email: 'hello@vyatri.in',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TripDetailClient trip={trip} related={related} />
    </>
  )
}
