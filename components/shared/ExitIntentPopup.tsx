'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { X } from 'lucide-react'

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const shownRef = useRef(false)

  useEffect(() => {
    if (sessionStorage.getItem('exit-popup-shown')) return

    // Show on timer (45s) or cursor leaving top
    const timer = setTimeout(() => show(), 45000)

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20) show()
    }
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const show = () => {
    if (shownRef.current) return
    shownRef.current = true
    setVisible(true)
    sessionStorage.setItem('exit-popup-shown', '1')
  }

  const close = useCallback(() => setVisible(false), [])

  // Escape key handler
  useEffect(() => {
    if (!visible) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [visible, close])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setTimeout(close, 2800)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(4px)', animation: 'bdFade 0.25s ease' }}
      onClick={close}
      role="presentation"
    >
      <div
        className="bg-gradient-to-br from-primary to-blue-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-sm w-full relative overflow-hidden"
        style={{ animation: 'mcSlide 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Exclusive discount offer"
      >
        {/* Decorative circle */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full" style={{ background: 'rgba(249,115,22,0.18)' }} aria-hidden="true" />

        <button onClick={close}
          className="absolute top-4 right-4 text-white/60 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/15 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          aria-label="Close offer popup">
          <X size={16} />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="text-white font-black text-xl">You're In!</h3>
            <p className="text-white/70 text-sm mt-1">Check your email for your exclusive 10% discount code.</p>
          </div>
        ) : (
          <>
            <div className="inline-block bg-accent/20 border border-accent/30 text-accent text-xs font-bold px-3 py-1 rounded-full mb-3">
              WAIT — EXCLUSIVE OFFER
            </div>
            <h3 className="text-white font-black text-xl sm:text-2xl leading-tight mb-2">
              Get <span className="text-accent">10% OFF</span> your first trip!
            </h3>
            <p className="text-white/70 text-sm mb-5">
              Join 5,000+ travelers. Get early-bird deals, new trip alerts, and your discount code instantly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email..."
                required
                className="w-full px-4 py-3 rounded-xl text-dark text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button type="submit"
                className="w-full btn-primary py-3.5 rounded-xl font-bold text-base">
                Claim My 10% Discount →
              </button>
            </form>

            <p className="text-white/40 text-xs text-center mt-3">
              ✅ No spam · 🔒 Your info is private
            </p>
          </>
        )}
      </div>
    </div>
  )
}
