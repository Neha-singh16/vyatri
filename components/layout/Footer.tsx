'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Send, Instagram, Youtube } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Domestic Trips', href: '/destinations/domestic' },
  { label: 'International Trips', href: '/destinations/international' },
  { label: 'Backpacking', href: '/destinations/backpacking' },
  { label: 'Weekend Getaways', href: '/destinations/weekend' },
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blogs' },
  { label: 'FAQ', href: '/faq' },
]

const popularTrips = [
  { label: 'Spiti Valley 7D', href: '/trips/spiti-valley-7d' },
  { label: 'Bhutan Backpacking', href: '/trips/bhutan-backpacking-7d' },
  { label: 'Kedarkantha Trek', href: '/trips/kedarkantha-winter-trek-6d' },
  { label: 'Kasol & Kheerganga', href: '/trips/kasol-kheerganga-weekend' },
  { label: 'Rajasthan Circuit', href: '/trips/rajasthan-royal-circuit-5d' },
  { label: 'Thailand Islands', href: '/trips/thailand-islands-7d' },
  { label: 'Hampta Pass Trek', href: '/trips/hampta-pass-trek-6d' },
  { label: 'Bali Adventure', href: '/trips/bali-adventure-7d' },
]

const destinations = [
  { label: 'Spiti Valley', href: '/trips/spiti-valley-7d' },
  { label: 'Kasol & Kheerganga', href: '/trips/kasol-kheerganga-weekend' },
  { label: 'Kedarkantha Trek', href: '/trips/kedarkantha-winter-trek-6d' },
  { label: 'Manali Snow Trip', href: '/trips/manali-winter-snow-4d' },
  { label: 'Rishikesh Adventure', href: '/trips/rishikesh-adventure-weekend' },
  { label: 'Goa Beach Weekend', href: '/trips/goa-beach-weekend-3d' },
  { label: 'Rajasthan Circuit', href: '/trips/rajasthan-royal-circuit-5d' },
  { label: 'Hampta Pass', href: '/trips/hampta-pass-trek-6d' },
  { label: 'Bhutan 7D', href: '/trips/bhutan-backpacking-7d' },
  { label: 'Thailand Islands', href: '/trips/thailand-islands-7d' },
  { label: 'Bali Adventure', href: '/trips/bali-adventure-7d' },
  { label: 'Nepal Everest', href: '/trips/nepal-pokhara-everest-8d' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="text-white" style={{ background: 'linear-gradient(160deg,#0d1b2a 0%,#1a2f4a 60%,#0d1b2a 100%)' }}>

      {/* ── Newsletter strip ── */}
      <div style={{ background: 'linear-gradient(135deg,#ff6b1a,#ea5a0b)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-lg">Get Early-Bird Deals & New Trip Alerts</h3>
            <p className="text-white/75 text-sm mt-0.5">Subscribe for exclusive offers. No spam, ever.</p>
          </div>
          {subscribed ? (
            <div className="flex items-center gap-2 bg-white/20 px-5 py-3 rounded-xl text-white font-semibold text-sm">
              ✅ You're subscribed! Watch your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full sm:w-auto" aria-label="Newsletter signup">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                aria-label="Email address for newsletter"
                className="flex-1 sm:w-64 px-4 py-2.5 rounded-xl text-dark text-sm focus:outline-none focus:ring-2 focus:ring-white bg-white"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="bg-dark hover:bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2"
              >
                <Send size={14} aria-hidden="true" /> Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── Main footer ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-orange-600 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" aria-hidden="true">
                  <polygon points="8,30 20,10 32,30" fill="white" opacity="0.9"/>
                  <polygon points="14,30 22,17 30,30" fill="#10B981" opacity="0.85"/>
                  <circle cx="28" cy="12" r="5" fill="#FCD34D"/>
                </svg>
              </div>
              <div>
                <div className="font-display font-black text-sm tracking-wider text-white">VYATRI</div>
                <div className="text-[9px] text-accent font-bold tracking-widest">TRIP PLANNER</div>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-5">
              Delhi's #1 group adventure travel company. Curated trips for solo travelers.
              Every trip comes with verified stays, expert guides & 24/7 support.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <a href="https://instagram.com/vyatri" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-accent/20 rounded-lg flex items-center justify-center text-white/60 hover:text-accent transition-all"
                aria-label="Vyatri on Instagram">
                <Instagram size={16} aria-hidden="true" />
              </a>
              <a href="https://wa.me/918700289516" target="_blank" rel="noopener noreferrer"
                className="group w-9 h-9 bg-white/10 hover:bg-green-500/20 rounded-lg flex items-center justify-center transition-all"
                aria-label="Vyatri WhatsApp">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white/60 group-hover:fill-green-400 transition-colors" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a href="https://youtube.com/@vyatri" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-red-500/20 rounded-lg flex items-center justify-center text-white/60 hover:text-red-400 transition-all"
                aria-label="Vyatri YouTube channel">
                <Youtube size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/55 hover:text-accent text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations 3-column */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-4">Popular Destinations</h4>
            <div className="grid grid-cols-1 gap-2">
              {destinations.map(l => (
                <Link key={l.href} href={l.href} className="text-white/55 hover:text-accent text-sm transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a href="tel:+918700289516"
                className="flex items-center gap-2.5 text-white/55 hover:text-accent text-sm transition-colors">
                <Phone size={14} className="flex-shrink-0" aria-hidden="true" /> +91 87002 89516
              </a>
              <a href="mailto:hello@vyatri.in"
                className="flex items-center gap-2.5 text-white/55 hover:text-accent text-sm transition-colors">
                <Mail size={14} className="flex-shrink-0" aria-hidden="true" /> hello@vyatri.in
              </a>
              <div className="flex items-start gap-2.5 text-white/55 text-sm">
                <MapPin size={14} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                B-24, Connaught Place,<br />New Delhi 110001
              </div>
            </div>

            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-white font-semibold text-sm mb-1">Mon–Sat, 9am–8pm</div>
              <div className="text-white/55 text-xs">WhatsApp: 24/7 support available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/35 text-xs text-center sm:text-left">
            © 2026 Vyatri Trip Planner. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="text-white/35 hover:text-white/60 text-xs transition-colors">Privacy</Link>
            <Link href="/terms" className="text-white/35 hover:text-white/60 text-xs transition-colors">Terms</Link>
            <Link href="/contact" className="text-white/35 hover:text-white/60 text-xs transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
