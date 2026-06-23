'use client'

import { useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'

const stats = [
  { value: 2000, suffix: '+', label: 'Happy Travellers', desc: 'Solo & group adventures', emoji: '🧳' },
  { value: 50,   suffix: '+', label: 'Destinations',     desc: 'India & worldwide',       emoji: '🌍' },
  { value: 150,  suffix: '+', label: 'Trips Done',        desc: 'Curated experiences',     emoji: '✅' },
  { value: 5,    suffix: '★', label: 'Average Rating',    desc: 'Google & TripAdvisor',    emoji: '⭐' },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, value, { duration: 2.2, ease: 'easeOut' })
    return controls.stop
  }, [inView, value, count])

  return (
    <span ref={ref} className="tabular-nums" aria-hidden="true">
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  )
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16"
      style={{ background: 'linear-gradient(135deg,#1a3875 0%,#0d1b2a 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20% 0px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
              className="text-center"
              role="img"
              aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
            >
              <div className="text-3xl mb-2" aria-hidden="true">{stat.emoji}</div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-1 leading-none">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <span className="sr-only">{stat.value}{stat.suffix} {stat.label}</span>
              </div>
              <div className="text-[#ff6b1a] font-bold text-sm sm:text-base">{stat.label}</div>
              <div className="text-white/50 text-xs sm:text-sm mt-0.5">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
