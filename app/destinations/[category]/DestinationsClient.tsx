'use client'

import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import TripCard from '@/components/trips/TripCard'
import type { Trip } from '@/lib/types'

interface Props {
  trips: Trip[]
  category: string
  title: string
  description: string
}

const difficulties = ['All', 'Easy', 'Easy-Moderate', 'Moderate']
const durations = ['All', '2-3 Days', '4-5 Days', '6-7 Days', '8+ Days']

export default function DestinationsClient({ trips, category, title, description }: Props) {
  const [diffFilter, setDiffFilter] = useState('All')
  const [durFilter, setDurFilter] = useState('All')
  const [sortBy, setSortBy] = useState('default')

  let filtered = [...trips]

  if (diffFilter !== 'All') filtered = filtered.filter(t => t.difficulty === diffFilter)
  if (durFilter !== 'All') {
    filtered = filtered.filter(t => {
      if (durFilter === '2-3 Days') return t.days <= 3
      if (durFilter === '4-5 Days') return t.days >= 4 && t.days <= 5
      if (durFilter === '6-7 Days') return t.days >= 6 && t.days <= 7
      if (durFilter === '8+ Days') return t.days >= 8
      return true
    })
  }
  if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price)
  if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price)
  if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating)

  return (
    <>
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-primary via-blue-900 to-dark pt-8 sm:pt-10 pb-10 sm:pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-warm opacity-25 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-accent font-semibold text-xs uppercase tracking-wider mb-2">
            {category.replace('-', ' ')}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 font-display">{title}</h1>
          <p className="text-white/70 max-w-2xl text-sm sm:text-base">{description}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-100 sticky top-[60px] sm:top-[64px] lg:top-[72px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="chips-scroll flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 flex-shrink-0">
              <SlidersHorizontal size={13} /> Filter:
            </div>

            {difficulties.map(d => (
              <button key={d} onClick={() => setDiffFilter(d)}
                className={`filter-chip px-3 py-1.5 rounded-lg text-xs font-medium border min-h-[36px] ${
                  diffFilter === d ? 'active border-transparent' : 'bg-white border-gray-200 text-gray-600 hover:border-primary/30'
                }`}>
                {d}
              </button>
            ))}

            <div className="w-px h-5 bg-gray-200 flex-shrink-0" />

            {durations.map(d => (
              <button key={d} onClick={() => setDurFilter(d)}
                className={`filter-chip px-3 py-1.5 rounded-lg text-xs font-medium border min-h-[36px] ${
                  durFilter === d ? 'bg-accent text-white border-transparent' : 'bg-white border-gray-200 text-gray-600 hover:border-accent/30'
                }`}>
                {d}
              </button>
            ))}

            <div className="w-px h-5 bg-gray-200 flex-shrink-0" />

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-xs font-medium border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none cursor-pointer flex-shrink-0 min-h-[36px]"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid — 2 cols mobile, 2 sm, 3 lg */}
      <div className="section-warm-alt py-8 sm:py-12 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length > 0 ? (
            <>
              <p className="text-sm text-gray-500 mb-5 sm:mb-6">{filtered.length} trip{filtered.length !== 1 ? 's' : ''} found</p>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                {filtered.map((trip, i) => (
                  <TripCard key={trip.id} trip={trip} priority={i < 4} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <div className="text-5xl mb-3">🔍</div>
              <p className="font-semibold text-dark text-lg">No trips match your filters</p>
              <p className="text-sm mt-1">Try adjusting the filters above</p>
              <button onClick={() => { setDiffFilter('All'); setDurFilter('All'); setSortBy('default') }}
                className="mt-4 text-primary font-medium text-sm hover:text-accent transition-colors">
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
