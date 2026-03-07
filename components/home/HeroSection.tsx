'use client'

import { useState, useEffect, useId } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Calendar, Users, ChevronDown } from 'lucide-react'

/* Premium hero images — real travel destinations, fast */
const SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    alt: 'Snow-capped Himalayan peaks at sunrise',
    label: '🏔️ Himalayas, India',
  },
  {
    src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=80',
    alt: 'Lush Bali rice terraces and temples',
    label: '🌿 Bali, Indonesia',
  },
  {
    src: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&w=1920&q=80',
    alt: 'Crystal blue Thailand island beach',
    label: '🏖️ Krabi, Thailand',
  },
  {
    src: 'https://images.unsplash.com/photo-1598335271430-d9e3e1d9a93a?auto=format&fit=crop&w=1920&q=80',
    alt: 'Adventure trekkers at mountain summit',
    label: '🎒 Spiti Valley, India',
  },
]

const FROM_CITIES = ['Delhi NCR','Gurgaon','Noida','Faridabad','Ghaziabad','Agra']
const DESTINATIONS = ['All Destinations','Spiti Valley','Kasol','Kedarkantha','Hampta Pass','Manali','Rishikesh','Goa','Rajasthan','Bhutan','Nepal','Thailand','Bali']
const MONTHS = ['Feb 2026','Mar 2026','Apr 2026','May 2026']
const TRAVELERS = ['Solo (1)','2 People','3–5 People','6–10 People','10+ People']

export default function HeroSection() {
  const [active, setActive] = useState(0)
  const [dest, setDest]     = useState('All Destinations')
  const router              = useRouter()
  const uid                 = useId()         // stable prefix for id/htmlFor pairs

  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % SLIDES.length), 5500)
    return () => clearInterval(t)
  }, [])

  function handleSearch(e: React.FormEvent, overrideDest?: string) {
    e.preventDefault()
    const d = overrideDest || dest
    const category =
      d === 'All Destinations'                                           ? 'domestic'
      : ['Spiti Valley','Kasol','Kedarkantha','Hampta Pass','Manali','Rishikesh','Goa','Rajasthan'].includes(d) ? 'domestic'
      : ['Bhutan','Nepal'].includes(d)                                   ? 'backpacking'
      : ['Thailand','Bali'].includes(d)                                  ? 'international'
      : 'domestic'
    router.push(`/destinations/${category}`)
  }

  return (
    <section
      className="relative w-full overflow-hidden -mt-[60px] sm:-mt-[64px] lg:-mt-[72px]"
      style={{ height: '100svh', minHeight: '640px', maxHeight: '940px' }}
      aria-label="Hero — explore group adventure trips"
    >

      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-[1200ms]"
          style={{ opacity: active === i ? 1 : 0, zIndex: 1 }}>
          <Image
            src={slide.src} alt={slide.alt} fill
            priority={i === 0} loading={i === 0 ? 'eager' : 'lazy'}
            quality={80} className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="hero-overlay absolute inset-0 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 pt-16 pb-24">
        <div className="w-full max-w-4xl mx-auto text-center">

          {/* Location pill */}
          <div className="inline-flex items-center gap-2 glass border border-white/25 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-[#00c87a] rounded-full animate-pulse flex-shrink-0" />
            {SLIDES[active].label} — Feb & Mar 2026 batches now open
          </div>

          {/* Headline */}
          <h1 className="font-display font-black text-white text-shadow-lg animate-fade-up"
            style={{ fontSize: 'clamp(2.4rem, 7.5vw, 5.2rem)', lineHeight: 1.04 }}>
            Unlock Group
            <br />
            <span className="gradient-text">Adventures</span>
          </h1>

          <p className="text-white/88 mt-4 mb-8 text-shadow animate-fade-up delay-100"
            style={{ fontSize: 'clamp(0.92rem, 2.2vw, 1.15rem)' }}>
            <span className="text-[#ffbf44] font-semibold">Domestic</span>
            <span className="mx-2.5 text-white/35">•</span>
            <span className="text-[#ffbf44] font-semibold">International</span>
            <span className="mx-2.5 text-white/35">•</span>
            <span className="text-[#ffbf44] font-semibold">Backpacking</span>
            <br />
            <span className="text-sm text-white/65">Solo-friendly · Starting ₹4,999 · Zero hidden charges</span>
          </p>

          {/* ── SEARCH BOX ── */}
          <form
            onSubmit={handleSearch}
            role="search"
            aria-label="Search trips"
            className="bg-white/97 backdrop-blur-md rounded-2xl shadow-2xl p-3 sm:p-4 animate-fade-up delay-200 border border-white/50"
          >
            {/* Desktop */}
            <div className="hidden sm:flex gap-1 items-center">
              {([
                { icon: <MapPin size={15} className="text-[#1a3875] flex-shrink-0" aria-hidden="true" />, label:'From',     id:`${uid}-from`, items: FROM_CITIES,  onChange: undefined as ((v:string)=>void)|undefined },
                { icon: <Search  size={15} className="text-[#1a3875] flex-shrink-0" aria-hidden="true" />, label:'Where to', id:`${uid}-dest`, items: DESTINATIONS, onChange: (v:string) => setDest(v)                   },
                { icon: <Calendar size={15} className="text-[#1a3875] flex-shrink-0" aria-hidden="true"/>, label:'When',     id:`${uid}-when`, items: MONTHS,       onChange: undefined as ((v:string)=>void)|undefined },
              ] as const).map((field) => (
                <div key={field.id} className="flex-1 flex items-center gap-2.5 bg-[#f7f3ef] hover:bg-blue-50 px-3 py-3 rounded-xl transition-colors min-w-0">
                  {field.icon}
                  <div className="min-w-0 flex-1">
                    <label htmlFor={field.id} className="text-[9px] font-black text-gray-400 uppercase tracking-widest cursor-pointer">{field.label}</label>
                    <select
                      id={field.id}
                      className="bg-transparent text-[#0d1b2a] text-sm font-semibold w-full mt-0.5 focus:outline-none cursor-pointer appearance-none focus-visible:ring-2 focus-visible:ring-[#1a3875] rounded"
                      onChange={field.onChange ? (e) => field.onChange!(e.target.value) : undefined}
                    >
                      {field.items.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <ChevronDown size={12} className="text-gray-400 flex-shrink-0" aria-hidden="true" />
                </div>
              ))}

              <div className="w-32 flex items-center gap-2 bg-[#f7f3ef] hover:bg-blue-50 px-3 py-3 rounded-xl transition-colors flex-shrink-0">
                <Users size={15} className="text-[#1a3875] flex-shrink-0" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <label htmlFor={`${uid}-people`} className="text-[9px] font-black text-gray-400 uppercase tracking-widest cursor-pointer">People</label>
                  <select id={`${uid}-people`} className="bg-transparent text-[#0d1b2a] text-sm font-semibold w-full mt-0.5 focus:outline-none cursor-pointer appearance-none focus-visible:ring-2 focus-visible:ring-[#1a3875] rounded">
                    {TRAVELERS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary px-6 py-3.5 rounded-xl font-bold text-sm flex-shrink-0 min-h-[56px] gap-1.5">
                <Search size={16} aria-hidden="true" /> Search
              </button>
            </div>

            {/* Mobile */}
            <div className="sm:hidden space-y-2.5">
              <div className="flex items-center gap-3 bg-[#f7f3ef] px-4 py-3.5 rounded-xl min-h-[54px] w-full">
                <MapPin size={16} className="text-[#1a3875] flex-shrink-0" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <label htmlFor={`${uid}-from-m`} className="text-[9px] font-black text-gray-400 uppercase tracking-widest">From</label>
                  <select id={`${uid}-from-m`} className="bg-transparent text-[#0d1b2a] text-sm font-semibold w-full mt-0.5 focus:outline-none">
                    {FROM_CITIES.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-[#f7f3ef] px-4 py-3.5 rounded-xl min-h-[54px] w-full">
                <Search size={16} className="text-[#1a3875] flex-shrink-0" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <label htmlFor={`${uid}-dest-m`} className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Where to?</label>
                  <select
                    id={`${uid}-dest-m`}
                    className="bg-transparent text-[#0d1b2a] text-sm font-semibold w-full mt-0.5 focus:outline-none"
                    onChange={e => setDest(e.target.value)}
                  >
                    {DESTINATIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 bg-[#f7f3ef] px-3 py-3.5 rounded-xl min-h-[54px]">
                  <Calendar size={14} className="text-[#1a3875] flex-shrink-0" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <label htmlFor={`${uid}-when-m`} className="text-[9px] font-black text-gray-400 uppercase tracking-widest">When</label>
                    <select id={`${uid}-when-m`} className="bg-transparent text-[#0d1b2a] text-xs font-semibold w-full mt-0.5 focus:outline-none">
                      {MONTHS.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-[#f7f3ef] px-3 py-3.5 rounded-xl min-h-[54px]">
                  <Users size={14} className="text-[#1a3875] flex-shrink-0" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <label htmlFor={`${uid}-people-m`} className="text-[9px] font-black text-gray-400 uppercase tracking-widest">People</label>
                    <select id={`${uid}-people-m`} className="bg-transparent text-[#0d1b2a] text-xs font-semibold w-full mt-0.5 focus:outline-none">
                      {TRAVELERS.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn-primary w-full py-4 rounded-xl font-bold text-base min-h-[56px] gap-2">
                <Search size={18} aria-hidden="true" /> Search Trips
              </button>
            </div>
          </form>

          {/* Quick search pills — clicking sets the destination and submits */}
          <div className="flex flex-wrap justify-center gap-2 mt-5 animate-fade-up delay-300">
            <span className="text-white/45 text-xs self-center hidden sm:block" aria-hidden="true">Popular:</span>
            {([
              { label:'🏔️ Spiti Valley', dest:'Spiti Valley' },
              { label:'🌿 Kasol Trek',   dest:'Kasol'        },
              { label:'🌏 Bhutan',       dest:'Bhutan'       },
              { label:'⚡ Rishikesh',    dest:'Rishikesh'    },
              { label:'🏖️ Goa',         dest:'Goa'          },
            ] as const).map(({ label, dest: d }) => (
              <button
                key={label}
                type="button"
                onClick={() => { setDest(d); handleSearch({ preventDefault: () => {} } as React.FormEvent, d) }}
                className="text-xs font-semibold glass border border-white/30 hover:border-white/60 px-3.5 py-1.5 rounded-full text-white transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                aria-label={`Search trips to ${d}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Slide indicator dots */}
      <div className="absolute bottom-[76px] left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`rounded-full transition-all duration-300 ${i === active ? 'w-7 h-2 bg-[#ff6b1a]' : 'w-2 h-2 bg-white/50 hover:bg-white/80'}`}
            aria-label={`Slide ${i + 1}`} />
        ))}
      </div>

      {/* Trust strip */}
      <div className="absolute bottom-0 left-0 right-0 z-20 glass-dark border-t border-white/10 py-3">
        <div className="max-w-5xl mx-auto px-4">
          <div className="chips-scroll flex gap-5 sm:gap-8 sm:justify-center">
            {['✅ Solo Safe','⭐ Verified Stays','📞 24/7 Support','🚫 Zero Hidden Charges','⭐ 4.9 Google Rating','🤝 5000+ Travelers'].map(t => (
              <span key={t} className="flex-shrink-0 text-white/80 text-xs sm:text-sm font-medium">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
