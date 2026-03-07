'use client'

import { useEffect, useRef, useState } from 'react'

const features = [
  { icon:'👤', title:'Solo-Friendly',      desc:'Travel alone, meet like-minded explorers. Small groups of 10–20.',        bg:'bg-blue-50',   accent:'text-[#1a3875]' },
  { icon:'💰', title:'Guaranteed Lowest',  desc:'Group cost cuts expenses. Zero hidden charges, ever.',                    bg:'bg-green-50',  accent:'text-emerald-600' },
  { icon:'🗺️', title:'Expert Guides',      desc:'Local guides with 5+ years of on-ground Himalayan experience.',           bg:'bg-orange-50', accent:'text-[#ff6b1a]' },
  { icon:'🏨', title:'Verified Stays',     desc:'Hand-picked hotels, homestays & camps — personally inspected.',           bg:'bg-purple-50', accent:'text-purple-600' },
  { icon:'🤝', title:'Great Crew',         desc:'Curated groups of like-minded travelers aged 20–35.',                     bg:'bg-yellow-50', accent:'text-amber-600' },
  { icon:'✅', title:'100% Hassle-Free',   desc:'Transport, stays, food & permits sorted. You just show up & enjoy.',      bg:'bg-teal-50',   accent:'text-teal-600' },
]

const stats = [
  { target:8,    suffix:'+',  label:'Years Experience', icon:'🏆' },
  { target:5000, suffix:'+',  label:'Happy Travelers',  icon:'😊' },
  { target:100,  suffix:'+',  label:'Trips Completed',  icon:'✈️' },
  { target:20,   suffix:'+',  label:'Destinations',     icon:'🌍' },
]

function CountUp({ target, suffix, label, icon }: typeof stats[0]) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (started) return
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setStarted(true); ob.disconnect()
        let cur = 0
        const inc = target / 50
        const t = setInterval(() => {
          cur += inc
          if (cur >= target) { setCount(target); clearInterval(t) }
          else setCount(Math.round(cur))
        }, 28)
      }
    }, { threshold: 0.5 })
    if (ref.current) ob.observe(ref.current)
    return () => ob.disconnect()
  }, [target, started])

  return (
    <div ref={ref} className="trust-stat text-center px-3 py-2">
      <div className="text-3xl mb-1">{icon}</div>
      <div className="font-black text-3xl sm:text-4xl text-[#ff6b1a]">{count.toLocaleString()}{suffix}</div>
      <div className="text-white/55 text-xs sm:text-sm mt-1 font-medium">{label}</div>
    </div>
  )
}

export default function WhyVyatri() {
  return (
    <section className="py-14 sm:py-20 relative overflow-hidden" style={{
      background: 'linear-gradient(170deg, #fff6ee 0%, #fff0e0 50%, #fff6ee 100%)'
    }}>
      {/* decorative */}
      <div className="absolute top-0 left-0 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-60"
        style={{ background:'radial-gradient(circle,rgba(255,107,26,0.18) 0,transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-50"
        style={{ background:'radial-gradient(circle,rgba(26,56,117,0.14) 0,transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="s-badge mb-4">✦ Why 5000+ Travelers Choose Us ✦</div>
          <h2 className="font-display font-black text-[#0d1b2a]" style={{ fontSize:'clamp(1.9rem,5vw,3rem)', lineHeight:1.1 }}>
            Why <span className="gradient-text">Vyatri?</span>
          </h2>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto text-sm sm:text-base">
            We don't just plan trips — we craft stories you'll tell for decades.
          </p>
        </div>

        {/* Feature grid — 2-col mobile, 3-col desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mb-12 sm:mb-16">
          {features.map(f => (
            <div key={f.title} className="feat-card p-4 sm:p-6">
              <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-3 ${f.bg}`}>
                {f.icon}
              </div>
              <h3 className={`font-bold text-sm sm:text-base mb-1 ${f.accent}`}>{f.title}</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-3">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="rounded-2xl sm:rounded-3xl py-8 sm:py-10 bg-deep-navy mesh-dark">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map(s => <CountUp key={s.label} {...s} />)}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a href="/destinations/domestic"
            className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-base min-h-[50px]">
            Browse All Trips
          </a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1fbd5a] text-white px-8 py-3.5 rounded-2xl font-bold text-base transition-colors min-h-[50px]">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  )
}
