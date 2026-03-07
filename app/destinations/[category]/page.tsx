import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DestinationsClient from './DestinationsClient'
import tripsData from '@/data/trips.json'
import type { Trip } from '@/lib/types'

const categoryMeta: Record<string, { title: string; description: string }> = {
  international: {
    title: 'International Group Trips from Delhi',
    description: 'Explore Bhutan, Thailand, Bali and more on curated group trips from Delhi. Starting ₹24,999.',
  },
  domestic: {
    title: 'Domestic Group Trips from Delhi',
    description: 'Best domestic group trips from Delhi — Spiti Valley, Rajasthan, Goa, Manali & more.',
  },
  backpacking: {
    title: 'Backpacking Trips from Delhi',
    description: 'Budget backpacking group tours from Delhi across India and Southeast Asia.',
  },
  'local-tours': {
    title: 'Local Tours from Delhi',
    description: 'Short local tours and day trips from Delhi NCR — Agra, Rishikesh, Jim Corbett & more.',
  },
  weekend: {
    title: 'Weekend Getaways from Delhi',
    description: 'Best weekend getaways from Delhi — hill stations, beaches, adventure camps under 8 hours.',
  },
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const meta = categoryMeta[params.category]
  if (!meta) return {}
  return { title: meta.title, description: meta.description }
}

export function generateStaticParams() {
  return Object.keys(categoryMeta).map((category) => ({ category }))
}

export default function DestinationsPage({ params }: { params: { category: string } }) {
  if (!categoryMeta[params.category]) notFound()

  const trips: Trip[] = (tripsData as Trip[]).filter((t) => {
    const cat = params.category
    if (cat === 'backpacking') return t.tags.includes('backpacking')
    if (cat === 'weekend') return t.tags.includes('weekend')
    if (cat === 'local-tours') return t.tags.includes('local-tours')
    return t.category === cat
  })

  const meta = categoryMeta[params.category]

  return (
    <DestinationsClient
      trips={trips}
      category={params.category}
      title={meta.title}
      description={meta.description}
    />
  )
}
