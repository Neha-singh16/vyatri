'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, ChevronDown, Zap, X, Menu } from 'lucide-react'
import { cn, PHONE_NUMBER, PHONE_DISPLAY, WHATSAPP_NUMBER } from '@/lib/utils'
import InquiryTrigger from '@/components/shared/InquiryTrigger'
import { useFocusTrap } from '@/hooks/useFocusTrap'

const destinations = [
  { label: 'International Trips', href: '/destinations/international', emoji: '🌍', desc: 'Thailand, Bali & more' },
  { label: 'Domestic Tours',      href: '/destinations/domestic',       emoji: '🏔️', desc: 'Spiti, Ladakh, Manali' },
  { label: 'Backpacking',         href: '/destinations/backpacking',    emoji: '🎒', desc: 'Budget adventures' },
  { label: 'Local Tours',         href: '/destinations/local-tours',    emoji: '📍', desc: 'Day trips nearby' },
  { label: 'Weekend Getaways',    href: '/destinations/weekend',        emoji: '⚡', desc: '2-3 day escapes' },
]

const navLinks = [
  { label: 'Home',         href: '/',                       emoji: '🏠' },
  { label: 'Destinations', href: '/destinations/domestic',  emoji: '🗺️', hasDropdown: true },
  { label: 'About',        href: '/about',                  emoji: '✨' },
  { label: 'Blogs',        href: '/blogs',                  emoji: '📖' },
  { label: 'FAQ',          href: '/faq',                    emoji: '💬' },
  { label: 'Contact',      href: '/contact',                emoji: '📞' },
]

const MOBILE_MENU_ID = 'vyatri-mobile-nav'

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [destOpen, setDestOpen]     = useState(false)
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const transparent = isHome && !scrolled
  
  // Refs
  const menuRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dropdownButtonRef = useRef<HTMLButtonElement>(null)
  
  // Focus trap — keeps keyboard focus inside the mobile menu while it's open
  useFocusTrap(menuRef, mobileOpen)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close on route change
  useEffect(() => { close() }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  const close = useCallback(() => {
    setMobileOpen(false)
    setDestOpen(false)
    setDesktopDropdownOpen(false)
  }, [])

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileOpen && !desktopDropdownOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen, desktopDropdownOpen, close])

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    if (!desktopDropdownOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(e.target as Node) &&
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(e.target as Node)
      ) {
        setDesktopDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [desktopDropdownOpen])

  return (
    <>
      {/* Skip to main content - Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[999] focus:bg-white focus:text-[#1a3875] focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* ─── DESKTOP + MOBILE TOP BAR ─── */}
      <nav
        className={cn(
          'left-0 right-0 top-0 z-50 transition-all duration-300 fixed',
          transparent ? 'navbar-transparent' : 'navbar-solid'
        )}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px] sm:h-[64px] lg:h-[72px]">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 z-10" aria-label="Vyatri Trip Planner — home">
              <div className={cn(
                'w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all',
                transparent ? 'bg-white/15 border border-white/25' : 'bg-gradient-to-br from-[#ff6b1a] to-[#ea5a0b] shadow-lg shadow-orange-500/25'
              )}>
                <svg viewBox="0 0 40 40" className="w-6 h-6 sm:w-7 sm:h-7" fill="none" aria-hidden="true">
                  <polygon points="8,30 20,10 32,30" fill="white" opacity="0.9"/>
                  <polygon points="14,30 22,17 30,30" fill="#00c87a" opacity="0.85"/>
                  <circle cx="28" cy="12" r="5" fill="#ffbf44"/>
                </svg>
              </div>
              <div>
                <div className={cn(
                  'font-display font-black text-[14px] sm:text-[15px] leading-none tracking-widest',
                  transparent ? 'text-white' : 'text-[#1a3875]'
                )}>VYATRI</div>
                <div className={cn(
                  'text-[8px] sm:text-[9px] font-bold leading-none mt-0.5 tracking-widest',
                  transparent ? 'text-[#ffbf44]' : 'text-[#ff6b1a]'
                )}>TRIP PLANNER</div>
              </div>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <div className="hidden lg:flex items-center gap-0.5" role="list">
              {navLinks.map(link => (
                <div key={link.label} className="relative nav-item" role="listitem">
                  {link.hasDropdown ? (
                    <>
                      <button
                        ref={dropdownButtonRef}
                        className={cn(
                          'nav-link-text flex items-center gap-1 px-4 py-2 rounded-xl text-[13.5px] font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6b1a]',
                          desktopDropdownOpen && 'bg-orange-50 !text-[#ff6b1a]'
                        )}
                        aria-haspopup="true"
                        aria-expanded={desktopDropdownOpen}
                        onClick={() => setDesktopDropdownOpen(v => !v)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setDesktopDropdownOpen(v => !v) }
                          if (e.key === 'Escape') setDesktopDropdownOpen(false)
                        }}
                      >
                        {link.label}
                        <ChevronDown size={13} className={cn('transition-transform duration-200 opacity-70', desktopDropdownOpen && 'rotate-180')} aria-hidden="true" />
                      </button>
                      <div 
                        ref={dropdownRef}
                        className={cn('nav-dropdown', desktopDropdownOpen && 'open')} 
                        role="menu" 
                        aria-label="Destinations submenu"
                      >
                        {destinations.map(d => (
                          <Link key={d.href} href={d.href}
                            role="menuitem"
                            onClick={() => setDesktopDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-orange-50 text-sm font-medium text-gray-700 hover:text-[#ff6b1a] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff6b1a] focus-visible:rounded-xl group">
                            <span className="text-lg group-hover:scale-110 transition-transform" aria-hidden="true">{d.emoji}</span>
                            <div>
                              <div className="font-semibold">{d.label}</div>
                              <div className="text-xs text-gray-400 font-normal">{d.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link href={link.href}
                      aria-current={pathname === link.href ? 'page' : undefined}
                      className={cn(
                        'nav-link-text block px-4 py-2 rounded-xl text-[13.5px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6b1a]',
                        pathname === link.href && !transparent ? '!text-[#ff6b1a] bg-orange-50' : '',
                        pathname === link.href && transparent  ? '!text-[#ffbf44]' : ''
                      )}>
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* ── Desktop Right ── */}
            <div className="hidden lg:flex items-center gap-3">
              <a href={`tel:${PHONE_NUMBER}`}
                className={cn(
                  'flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-[#ff6b1a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6b1a] rounded px-2 py-1',
                  transparent ? 'text-white/85' : 'text-gray-700'
                )}>
                <Phone size={13} aria-hidden="true" /> {PHONE_DISPLAY}
              </a>
              <InquiryTrigger className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-1.5 min-h-[42px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:scale-105 transition-transform">
                <Zap size={14} aria-hidden="true" /> Enquire Now
              </InquiryTrigger>
            </div>

            {/* ── Mobile Right Side: Enquiry + Hamburger ── */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Mobile Enquiry Button - Always visible */}
              <InquiryTrigger 
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95',
                  transparent 
                    ? 'bg-white/15 backdrop-blur-sm text-white border border-white/25 hover:bg-white/25' 
                    : 'bg-gradient-to-r from-[#ff6b1a] to-[#ea5a0b] text-white shadow-md shadow-orange-500/20'
                )}
              >
                <Zap size={12} aria-hidden="true" />
                <span className="hidden xs:inline">Enquire</span>
              </InquiryTrigger>

              {/* ── HAMBURGER — Enhanced visibility ── */}
              <button
                className={cn(
                  'hamburger-btn relative flex items-center justify-center w-11 h-11 rounded-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                  transparent 
                    ? 'bg-white/15 backdrop-blur-sm border border-white/25 hover:bg-white/25 focus-visible:outline-white' 
                    : 'bg-gray-100 hover:bg-gray-200 focus-visible:outline-[#ff6b1a]'
                )}
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                aria-controls={MOBILE_MENU_ID}
              >
                <Menu 
                  size={22} 
                  className={cn(
                    'transition-colors',
                    transparent ? 'text-white' : 'text-[#1a3875]'
                  )} 
                  strokeWidth={2.5}
                />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* ─── MOBILE MENU BACKDROP ─── */}
      <div
        className={cn(
          'fixed inset-0 bg-black/60 backdrop-blur-sm z-[250] lg:hidden transition-opacity duration-300',
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={close}
        aria-hidden="true"
      />

      {/* ─── MOBILE MENU PANEL ─── */}
      <div
        ref={menuRef}
        id={MOBILE_MENU_ID}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!mobileOpen}
        className={cn('mobile-menu lg:hidden', mobileOpen && 'open')}
        // Prevent Tab from reaching the page when menu is closed
        {...(!mobileOpen ? { inert: '' as unknown as undefined } : {})}
      >
        {/* Header */}
        <div className="mob-header relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b1a] to-[#ea5a0b] rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30" aria-hidden="true">
              <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
                <polygon points="8,30 20,10 32,30" fill="white" opacity="0.9"/>
                <polygon points="14,30 22,17 30,30" fill="#00c87a" opacity="0.85"/>
                <circle cx="28" cy="12" r="5" fill="#ffbf44"/>
              </svg>
            </div>
            <div>
              <div className="font-display font-black text-[16px] text-white tracking-widest">VYATRI</div>
              <div className="text-[10px] text-[#ff6b1a] font-bold tracking-widest">TRIP PLANNER</div>
            </div>
          </div>
          <button
            onClick={close}
            className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Close navigation menu"
          >
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>

        {/* Nav Links */}
        <nav aria-label="Mobile navigation" className="relative z-10 px-4 pt-4 pb-2 space-y-1">
          {navLinks.map((link, index) => (
            <div key={link.label} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-up">
              {link.hasDropdown ? (
                <>
                  <button
                    onClick={() => setDestOpen(v => !v)}
                    className="mob-link w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                    aria-expanded={destOpen}
                    aria-controls="mob-destinations"
                  >
                    <span className="mob-icon" aria-hidden="true">{link.emoji}</span>
                    <span className="flex-1 text-left">{link.label}</span>
                    <ChevronDown size={18}
                      className={cn('text-white/40 transition-transform duration-300', destOpen && 'rotate-180')}
                      aria-hidden="true"
                    />
                  </button>
                  <div 
                    id="mob-destinations" 
                    className={cn(
                      'overflow-hidden transition-all duration-300',
                      destOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                    )}
                  >
                    <div className="ml-4 mt-2 pl-4 border-l-2 border-[#ff6b1a]/40 space-y-1">
                      {destinations.map((d, i) => (
                        <Link 
                          key={d.href} 
                          href={d.href} 
                          onClick={close}
                          style={{ animationDelay: `${i * 30}ms` }}
                          className={cn(
                            "flex items-center gap-3 py-3 px-3 rounded-xl text-[15px] text-white/75 hover:text-white hover:bg-white/5 font-medium transition-all min-h-[52px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:rounded-lg",
                            destOpen && 'animate-fade-up'
                          )}
                        >
                          <span className="text-xl" aria-hidden="true">{d.emoji}</span>
                          <div>
                            <div>{d.label}</div>
                            <div className="text-xs text-white/40 font-normal">{d.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link 
                  href={link.href} 
                  onClick={close}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className={cn('mob-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-white', pathname === link.href && 'active')}
                >
                  <span className="mob-icon" aria-hidden="true">{link.emoji}</span>
                  <span className="flex-1">{link.label}</span>
                  {pathname === link.href && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b1a] flex-shrink-0 animate-pulse" aria-hidden="true" />
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="mob-divider" role="separator" />

        {/* CTAs */}
        <div className="relative z-10 px-4 py-4 space-y-3">
          <a href={`tel:${PHONE_NUMBER}`}
            className="mob-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-white bg-white/5 hover:bg-white/10">
            <span className="mob-icon bg-green-500/20" aria-hidden="true">📞</span>
            <div>
              <div className="text-base font-bold text-white">{PHONE_DISPLAY}</div>
              <div className="text-xs text-white/50 font-normal">Mon–Sat 9am–7pm</div>
            </div>
          </a>

          <InquiryTrigger
            onClick={close}
            className="btn-primary w-full py-4 rounded-2xl font-bold text-[15px] min-h-[56px] gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white shadow-lg shadow-orange-500/30"
          >
            <Zap size={18} aria-hidden="true" /> Enquire Now — Free Callback
          </InquiryTrigger>

          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1fbd5a] active:scale-[0.98] text-white w-full py-4 rounded-2xl font-bold text-[15px] min-h-[56px] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white shadow-lg shadow-green-500/30">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
        </div>

        {/* Trust strip */}
        <div className="relative z-10 px-4 pb-8 pt-4">
          <div className="flex items-center justify-center gap-4 flex-wrap" aria-label="Trust indicators">
            {[
              { icon: '⭐', text: '4.9 Rating' },
              { icon: '👥', text: '5000+ Travelers' },
              { icon: '✅', text: 'Verified Stays' }
            ].map(t => (
              <span key={t.text} className="flex items-center gap-1.5 text-white/40 text-xs font-medium">
                <span aria-hidden="true">{t.icon}</span> {t.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
