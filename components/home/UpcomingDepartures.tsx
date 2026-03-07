import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, Flame, ArrowRight } from 'lucide-react'
import type { Trip } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import InquiryTrigger from '@/components/shared/InquiryTrigger'

/* Vivid real images per trip */
const DEST_IMAGES: Record<string, string> = {
  'spiti-valley-7d':             'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=75',
  'kasol-kheerganga-weekend':    'https://images.unsplash.com/photo-1585495595965-d929ac768c94?auto=format&fit=crop&w=600&q=75',
  'kedarkantha-winter-trek-6d':  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=75',
  'bhutan-backpacking-7d':       'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=75',
  'goa-beach-weekend-3d':        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=75',
  'manali-winter-snow-4d':       'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=75',
  'rishikesh-adventure-weekend': 'https://images.unsplash.com/photo-1591790393277-b3aa36a0f0e8?auto=format&fit=crop&w=600&q=75',
  'rajasthan-royal-circuit-5d':  'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=75',
}

const SEATS: Record<string, { left: number; status: 'hot'|'filling'|'open' }> = {
  'spiti-valley-7d':             { left:3,  status:'hot'     },
  'kasol-kheerganga-weekend':    { left:5,  status:'hot'     },
  'kedarkantha-winter-trek-6d':  { left:2,  status:'hot'     },
  'bhutan-backpacking-7d':       { left:4,  status:'filling' },
  'goa-beach-weekend-3d':        { left:7,  status:'filling' },
  'manali-winter-snow-4d':       { left:8,  status:'open'    },
  'rishikesh-adventure-weekend': { left:11, status:'open'    },
  'rajasthan-royal-circuit-5d':  { left:6,  status:'filling' },
}

interface Props { trips: Trip[] }

export default function UpcomingDepartures({ trips }: Props) {
  const upcoming = trips
    .filter(t => SEATS[t.slug])
    .sort((a, b) => {
      const ord = { hot:0, filling:1, open:2 }
      return ord[SEATS[a.slug]?.status||'open'] - ord[SEATS[b.slug]?.status||'open']
    })
    .slice(0, 6)

  return (
    <section className="py-12 sm:py-20 relative overflow-hidden" style={{
      background:'linear-gradient(170deg,#f7f3ef 0%,#ede8e0 50%,#f7f3ef 100%)'
    }}>
      <div className="absolute inset-0 mesh-warm pointer-events-none opacity-60" />
      <div className="absolute top-0 right-0 w-36 h-36 dot-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex items-end justify-between mb-7 sm:mb-10">
          <div>
            <p className="text-[#ff6b1a] font-bold text-xs uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Flame size={12} className="text-red-500" /> Feb & Mar 2026 · Limited Seats
            </p>
            <h2 className="font-display font-black text-[#0d1b2a]" style={{ fontSize:'clamp(1.9rem,5vw,3rem)', lineHeight:1.1 }}>
              Upcoming <span className="gradient-text">Departures</span>
            </h2>
          </div>
          <Link href="/destinations/domestic"
            className="hidden sm:flex items-center gap-1.5 text-[#1a3875] font-semibold text-sm hover:text-[#ff6b1a] transition-colors group">
            All Trips <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cards — 2-col mobile, 3-col desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {upcoming.map(trip => {
            const seat = SEATS[trip.slug]
            const seatCls  = seat.status === 'hot' ? 'badge-hot' : seat.status === 'filling' ? 'badge-filling' : 'badge-open'
            const seatLabel = seat.status === 'hot' ? `🔥 Only ${seat.left} left!` : seat.status === 'filling' ? `⚡ ${seat.left} seats` : `✅ ${seat.left} open`
            const imgSrc = DEST_IMAGES[trip.slug] || trip.image

            return (
              <div key={trip.id} className="trip-card card-glow flex flex-col">
                <Link href={`/trips/${trip.slug}`}
                  className="relative block overflow-hidden flex-shrink-0 aspect-[4/3] sm:aspect-[3/2]">
                  <Image src={imgSrc} alt={trip.title} fill loading="lazy" quality={75}
                    className="trip-card-image object-cover"
                    sizes="(max-width:640px) 50vw,(max-width:1024px) 50vw,33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/75 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5">
                    <span className="flex items-center gap-1 text-white text-[10px] font-bold bg-black/35 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      <Clock size={9} />{trip.duration}
                    </span>
                  </div>
                </Link>

                <div className="p-3 sm:p-4 flex flex-col flex-1">
                  <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-2 ${seatCls}`}>
                    {seatLabel}
                  </span>

                  <Link href={`/trips/${trip.slug}`}>
                    <h3 className="font-bold text-[#0d1b2a] text-[13px] sm:text-[15px] line-clamp-2 hover:text-[#ff6b1a] transition-colors">
                      {trip.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1.5 mt-1.5 text-[10px] sm:text-[11px] text-gray-500">
                    <Calendar size={9} className="text-[#1a3875]" />
                    <span className="line-clamp-1">{trip.nextBatch}</span>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-gray-100">
                    <div>
                      <div className="text-[10px] text-gray-300 line-through hidden sm:block">{formatPrice(trip.originalPrice)}</div>
                      <div className="font-black text-[#1a3875] text-base sm:text-lg leading-none">{formatPrice(trip.price)}</div>
                      <div className="text-[9px] text-gray-400">per person</div>
                    </div>
                    <InquiryTrigger tripTitle={trip.title} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link href="/destinations/domestic"
            className="inline-flex items-center gap-2 btn-primary px-6 py-3.5 rounded-xl text-sm font-bold min-h-[48px]">
            View All Trips <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
