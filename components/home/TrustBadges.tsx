'use client'

import { Shield, Award, Lock, Headphones } from 'lucide-react'
import { motion } from 'framer-motion'

const badges = [
  {
    icon: Shield,
    title: 'Government Registered',
    desc: 'Ministry of Tourism certified travel company',
  },
  {
    icon: Award,
    title: 'ISO Safety Certified',
    desc: 'ISO 9001:2015 quality management standard',
  },
  {
    icon: Lock,
    title: 'Secure Payments (SSL)',
    desc: '256-bit SSL encrypted transactions',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Round-the-clock WhatsApp & call support',
  },
]

export default function TrustBadges() {
  return (
    <div className="py-8 sm:py-10 border-y border-gray-200/60" style={{ background: '#fefaf6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex items-start gap-3 p-4 rounded-2xl border border-gray-200/80 bg-white/70 hover:border-[#ff6b1a]/30 hover:shadow-md transition-all"
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,107,26,0.1)' }}
                aria-hidden="true"
              >
                <badge.icon size={20} className="text-[#ff6b1a]" strokeWidth={2} />
              </div>
              <div>
                <div className="font-bold text-[#0d1b2a] text-sm leading-snug">{badge.title}</div>
                <div className="text-gray-500 text-xs mt-0.5 leading-snug">{badge.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
