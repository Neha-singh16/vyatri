import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const DESTINATIONS = [
  {
    name: 'Rajasthan',
    tagline: 'Land of Kings',
    tag: 'Heritage',
    href: '/destinations/domestic',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=75',
    color: 'from-[#8B1A1A] to-[#2c0a0a]',
  },
  {
    name: 'Kerala',
    tagline: "God's Own Country",
    tag: 'Nature',
    href: '/destinations/domestic',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=75',
    color: 'from-[#1a4d1a] to-[#0a2a0a]',
  },
  {
    name: 'Goa',
    tagline: 'Sun, Sand & Vibes',
    tag: 'Beach',
    href: '/destinations/domestic',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=75',
    color: 'from-[#00478a] to-[#001a33]',
  },
  {
    name: 'Manali',
    tagline: 'Snow-Capped Dreams',
    tag: 'Adventure',
    href: '/destinations/domestic',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=75',
    color: 'from-[#1a3a5c] to-[#0a1a2a]',
  },
  {
    name: 'Bhutan',
    tagline: 'Land of Happiness',
    tag: 'Spiritual',
    href: '/destinations/international',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=75',
    color: 'from-[#4a2000] to-[#1a0a00]',
  },
]

export default function DestinationsStrip() {
  return (
    <section className="py-12 sm:py-18" style={{
      background: 'linear-gradient(170deg, #f7f3ef 0%, #ede8e0 60%, #f7f3ef 100%)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-end justify-between mb-7 sm:mb-10">
          <div>
            <div className="s-badge mb-3">🗺️ Top Picks</div>
            <h2 className="font-display font-black text-[#0d1b2a]" style={{ fontSize:'clamp(1.9rem,5vw,3rem)',lineHeight:1.1 }}>
              Popular <span className="gradient-text">Destinations</span>
            </h2>
          </div>
          <Link href="/destinations/domestic"
            className="hidden sm:flex items-center gap-1.5 text-[#1a3875] font-semibold text-sm hover:text-[#ff6b1a] transition-colors group">
            View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* First card — large */}
          <Link href={DESTINATIONS[0].href}
            className="dest-card col-span-2 sm:col-span-1 lg:col-span-2"
            style={{ minHeight:'clamp(180px,28vw,280px)' }}>
            <Image src={DESTINATIONS[0].image} alt={DESTINATIONS[0].name} fill
              className="dest-card-img object-cover" sizes="(max-width:640px) 100vw,(max-width:1024px) 33vw,40vw"
              priority />
            <div className="dest-card-overlay" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 z-10">
              <span className="text-[10px] font-bold text-[#ffbf44] uppercase tracking-widest mb-1">{DESTINATIONS[0].tag}</span>
              <h3 className="font-display font-black text-white text-2xl sm:text-3xl leading-none">{DESTINATIONS[0].name}</h3>
              <p className="text-white/70 text-xs mt-1">{DESTINATIONS[0].tagline}</p>
            </div>
          </Link>

          {/* Remaining 4 */}
          {DESTINATIONS.slice(1).map(dest => (
            <Link key={dest.name} href={dest.href}
              className="dest-card"
              style={{ minHeight:'clamp(130px,20vw,200px)' }}>
              <Image src={dest.image} alt={dest.name} fill
                className="dest-card-img object-cover" sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,20vw"
                loading="lazy" />
              <div className="dest-card-overlay" />
              <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 z-10">
                <span className="text-[9px] font-bold text-[#ffbf44] uppercase tracking-widest mb-0.5">{dest.tag}</span>
                <h3 className="font-bold text-white text-sm sm:text-base leading-tight">{dest.name}</h3>
                <p className="text-white/60 text-[10px] hidden sm:block">{dest.tagline}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="sm:hidden mt-5 text-center">
          <Link href="/destinations/domestic"
            className="inline-flex items-center gap-2 btn-outline px-6 py-3 rounded-xl text-sm font-bold min-h-[44px]">
            All Destinations <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
