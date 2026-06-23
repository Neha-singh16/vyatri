'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Users, Clock, Star, MapPin, ArrowRight } from 'lucide-react'
import { cn, formatPrice, getDiscountPercent, BADGE_COLORS } from '@/lib/utils'
import type { Trip } from '@/lib/types'
import InquiryModal from '@/components/shared/InquiryModal'

/* Real, vivid Unsplash images per destination */
const DEST_IMAGES: Record<string, string> = {
  'spiti-valley-7d':             'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=75',
  'kasol-kheerganga-weekend':    'https://images.unsplash.com/photo-1585495595965-d929ac768c94?auto=format&fit=crop&w=600&q=75',
  'kedarkantha-winter-trek-6d':  'https://images.unsplash.com/photo-1591790393996-4e02effc8e21?auto=format&fit=crop&w=600&q=75',
  'bhutan-backpacking-7d':       'https://images.unsplash.com/photo-1582650808801-1e967a544158?auto=format&fit=crop&w=600&q=75',
  'thailand-islands-7d':         'https://images.unsplash.com/photo-1552465011-b4e21cd1431f?auto=format&fit=crop&w=600&q=75',
  'rajasthan-royal-circuit-5d':  'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=75',
  'goa-beach-weekend-3d':        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=75',
  'manali-winter-snow-4d':       'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=75',
  'bali-adventure-7d':           'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=75',
  'rishikesh-adventure-weekend': 'https://images.unsplash.com/photo-1591790393277-b3aa36a0f0e8?auto=format&fit=crop&w=600&q=75',
  'hampta-pass-trek-6d':         'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=75',
  'nepal-pokhara-everest-8d':    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=75',
}

const SEATS: Record<string, number> = {
  'spiti-valley-7d': 3, 'kasol-kheerganga-weekend': 5, 'kedarkantha-winter-trek-6d': 2,
  'bhutan-backpacking-7d': 4, 'thailand-islands-7d': 7, 'rajasthan-royal-circuit-5d': 4,
  'goa-beach-weekend-3d': 9, 'manali-winter-snow-4d': 6, 'bali-adventure-7d': 3,
  'rishikesh-adventure-weekend': 11, 'hampta-pass-trek-6d': 5, 'nepal-pokhara-everest-8d': 4,
}

/* Difficulty badge colors */
const DIFF_STYLE: Record<string, string> = {
  'Easy':            'bg-emerald-500/90 text-white',
  'Easy–Moderate':   'bg-teal-500/90 text-white',
  'Moderate':        'bg-amber-500/90 text-white',
  'Moderate–Hard':   'bg-orange-500/90 text-white',
  'Challenging':     'bg-red-500/90 text-white',
}

interface Props { trip: Trip; priority?: boolean }

export default function TripCard({ trip, priority = false }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const seatsLeft = SEATS[trip.slug]
  const discount   = getDiscountPercent(trip.originalPrice, trip.price)
  const badgeClass = BADGE_COLORS[trip.badge] || 'bg-[#1a3875] text-white'
  const isHot      = seatsLeft !== undefined && seatsLeft <= 5
  const imgSrc     = DEST_IMAGES[trip.slug] || trip.image.replace('w=800', 'w=600').replace('q=80', 'q=75') + '&auto=format&fit=crop'

  return (
    <>
      <article
        className="trip-card flex flex-col h-full group relative"
      >

        {/* ── Image ── */}
        <Link
          href={`/trips/${trip.slug}`}
          className="relative block overflow-hidden flex-shrink-0 aspect-[4/3] sm:aspect-[3/2]"
          aria-label={`View ${trip.title} trip details — ${trip.duration} from ${trip.departure}`}
        >
          {!imgLoaded && <div className="absolute inset-0 skeleton rounded-none" />}

          <Image
            src={imgSrc}
            alt={`${trip.title} group trek ${trip.subtitle.split('·')[0].trim()} adventure tour`}
            fill
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            quality={75}
            className={cn('trip-card-image object-cover transition-all duration-500 group-hover:scale-105', imgLoaded ? 'opacity-100' : 'opacity-0')}
            sizes="(max-width:480px) 100vw, (max-width:768px) 50vw, (max-width:1024px) 50vw, 33vw"
            onLoad={() => setImgLoaded(true)}
          />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/90 via-transparent to-transparent" />

          {/* Difficulty badge TL */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className={cn('text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm', DIFF_STYLE[trip.difficulty] || 'bg-gray-600/90 text-white')}>
              {trip.difficulty}
            </span>
          </div>

          {/* Price badge TR */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="flex flex-col items-end">
              {discount > 0 && (
                <span className="text-[8px] font-black bg-red-500 text-white px-1.5 py-0.5 rounded-md mb-0.5 shadow">-{discount}%</span>
              )}
              <span className="text-[10px] sm:text-xs font-black bg-[#ff6b1a] text-white px-2 py-0.5 rounded-full shadow-md">
                {formatPrice(trip.price)}
              </span>
            </span>
          </div>

          {isHot && <div className="ribbon">🔥 {seatsLeft} left!</div>}

          {/* Duration BL */}
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className="flex items-center gap-1 text-white text-[10px] font-bold bg-black/35 backdrop-blur-sm px-2 py-0.5 rounded-full">
              <Clock size={9} aria-hidden="true" />{trip.duration}
            </span>
          </div>

          {/* Rating BR */}
          <div className="absolute bottom-2.5 right-2.5 z-10">
            <span className="flex items-center gap-1 text-white text-[10px] font-bold bg-black/35 backdrop-blur-sm px-2 py-0.5 rounded-full">
              <Star size={9} className="fill-yellow-400 text-yellow-400" aria-hidden="true" />{trip.rating}
            </span>
          </div>

          {/* "View Trip" CTA — slides up on hover */}
          <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="bg-[#ff6b1a] text-white text-xs font-bold py-2 flex items-center justify-center gap-1.5">
              <ArrowRight size={13} aria-hidden="true" /> View Trip Details
            </div>
          </div>
        </Link>

        {/* ── Body ── */}
        <div className="p-3 sm:p-4 flex flex-col flex-1">

          {/* Category badge */}
          <div className="mb-1.5">
            <span className={cn('text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm', badgeClass)}>
              {trip.badge}
            </span>
          </div>

          {/* Title */}
          <Link href={`/trips/${trip.slug}`}>
            <h3 className="font-bold text-[#0d1b2a] text-[13px] sm:text-[15px] leading-snug line-clamp-2 hover:text-[#ff6b1a] transition-colors group-hover:text-[#ff6b1a]">
              {trip.title}
            </h3>
          </Link>

          {/* Location */}
          <div className="flex items-center gap-1 mt-1.5 text-gray-400 text-[10px] sm:text-[11px]">
            <MapPin size={10} className="text-[#ff6b1a] flex-shrink-0" aria-hidden="true" />
            <span className="line-clamp-1">{trip.departure} → {trip.subtitle?.split('·')[0]?.trim() || 'India'}</span>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-2 mt-2 text-[10px] sm:text-[11px] text-gray-500 flex-wrap">
            <span className="flex items-center gap-1">
              <Calendar size={10} className="text-[#1a3875] flex-shrink-0" aria-hidden="true" />
              <span className="line-clamp-1">{trip.nextBatch}</span>
            </span>
            <span className="hidden xs:flex items-center gap-1">
              <Users size={10} className="text-[#00c87a]" aria-hidden="true" />{trip.groupSize}
            </span>
          </div>

          {/* Price + CTA */}
          <div className="mt-auto pt-3 sm:pt-3.5 border-t border-gray-100">
            <div className="flex items-end justify-between gap-2">
              <div>
                {discount > 0 && (
                  <div className="text-[10px] sm:text-[11px] text-gray-300 line-through leading-none">{formatPrice(trip.originalPrice)}</div>
                )}
                <div className={cn(discount > 0 ? 'price-main-sm' : 'price-main sm:price-main')}>
                  {formatPrice(trip.price)}
                </div>
                <div className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">per person</div>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                aria-label={`Book ${trip.title} now — starts at ${formatPrice(trip.price)}`}
                className="btn-primary px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-bold min-h-[36px] sm:min-h-[42px] whitespace-nowrap flex-shrink-0 active:scale-95"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </article>

      <InquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} tripTitle={trip.title} />
    </>
  )
}
