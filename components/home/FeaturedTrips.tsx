'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Compass } from 'lucide-react'
import TripCard from '@/components/trips/TripCard'
import { cn } from '@/lib/utils'
import type { Trip } from '@/lib/types'

const TABS = [
  { label: '🌍 International', value: 'international', color: 'from-blue-600 to-indigo-700' },
  { label: '🏔️ Domestic',      value: 'domestic',      color: 'from-emerald-600 to-teal-700' },
  { label: '🎒 Backpacking',   value: 'backpacking',   color: 'from-amber-500 to-orange-600' },
  { label: '⚡ Weekend',        value: 'weekend',       color: 'from-rose-500 to-pink-600' },
]

export default function FeaturedTrips({ trips }: { trips: Trip[] }) {
  const [active, setActive] = useState('international')

  const filtered = trips.filter(t => {
    if (active === 'backpacking') return t.tags?.includes('backpacking')
    if (active === 'weekend')     return t.tags?.includes('weekend')
    return t.category === active
  }).slice(0, 6)

  return (
    <section className="relative py-14 sm:py-20 overflow-hidden" style={{
      background: 'linear-gradient(170deg, #eef2fb 0%, #e3eaff 40%, #eef2fb 100%)'
    }}>
      {/* decorative */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,107,26,0.12) 0, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(26,56,117,0.14) 0, transparent 70%)' }} />
      <div className="absolute top-0 right-0 w-44 h-44 dot-pattern opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="s-badge mb-4">
            <Compass size={11} /> Feb–Apr 2026 · New Batches Every Week
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h2 className="font-display font-black text-[#0d1b2a]" style={{ fontSize: 'clamp(2rem,5vw,3.25rem)', lineHeight:1.08 }}>
                Group <span className="gradient-text">Adventures</span>
              </h2>
              <p className="text-gray-500 mt-2 text-sm sm:text-base max-w-lg">
                Solo travelers welcome — join a crew, make lifelong friends, explore the world.
              </p>
            </div>
            <Link href={`/destinations/${active}`}
              className="hidden sm:flex items-center gap-1.5 text-[#1a3875] font-semibold text-sm hover:text-[#ff6b1a] transition-colors group">
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Filter tabs — scrollable on mobile */}
        <div className="chips-scroll flex gap-2.5 mb-8 sm:mb-10 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {TABS.map(tab => (
            <button key={tab.value} onClick={() => setActive(tab.value)}
              className={cn(
                'filter-chip px-5 py-2.5 rounded-2xl text-sm font-bold border transition-all min-h-[44px]',
                active === tab.value
                  ? `bg-gradient-to-r ${tab.color} text-white border-transparent shadow-lg`
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#ff6b1a]/40 hover:text-[#ff6b1a] shadow-sm'
              )}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid — 2 col mobile, 3 col desktop */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((trip, i) => (
              <TripCard key={trip.id} trip={trip} priority={i < 2} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-3">🔍</div>
            <p className="font-semibold">No trips in this category yet.</p>
          </div>
        )}

        {/* View all */}
        <div className="text-center mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href={`/destinations/${active}`}
            className="btn-outline px-8 py-3.5 rounded-2xl font-bold text-sm min-h-[50px] group gap-2">
            View All {TABS.find(t => t.value === active)?.label.split(' ').slice(1).join(' ')} Trips
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
