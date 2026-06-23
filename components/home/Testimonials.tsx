'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Delhi',
    trip: 'Spiti Valley 7D',
    rating: 5,
    review: 'Vyatri made my solo Spiti dream come true! The group was incredible, guide Ramesh world-class. Already booked Bhutan! 🏔️',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
  },
  {
    name: 'Aditya Verma',
    location: 'Gurgaon',
    trip: 'Thailand 7D',
    rating: 5,
    review: 'Best group trip ever. Everything perfectly organized — flights, transfers, hotels. Insane value. Made 6 best friends for life! ✈️',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  },
  {
    name: 'Sneha Patel',
    location: 'Noida',
    trip: 'Kasol & Kheerganga',
    rating: 5,
    review: 'Kheerganga was breathtaking — camping under a billion stars and soaking in natural hot springs at midnight. So caring! 🌟',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80',
  },
  {
    name: 'Rohit Gupta',
    location: 'Delhi',
    trip: 'Bhutan 7D',
    rating: 5,
    review: "Bhutan was life-changing. Tiger's Nest, Punakha Dzong — Vyatri showed us the real Bhutan. The group felt like family by Day 2. 🙏",
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
  },
  {
    name: 'Ananya Singh',
    location: 'Ghaziabad',
    trip: 'Kedarkantha Trek',
    rating: 5,
    review: 'Summited at 3800m with zero trekking experience. The guides were patient, the views were surreal. 100% recommending Vyatri! 🏕️',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  },
  {
    name: 'Karan Mehta',
    location: 'Faridabad',
    trip: 'Bali Adventure 7D',
    rating: 5,
    review: "Mt. Batur sunrise trek was otherworldly. Vyatri's Bali package had everything — volcano, beaches, temples. Perfect holiday! 🌺",
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
  },
]

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 1 },
    },
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  // Auto-scroll every 4s, pause on hover
  useEffect(() => {
    if (shouldReduceMotion) return
    if (isHovered) {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current)
      return
    }
    autoScrollRef.current = setInterval(() => {
      emblaApi?.scrollNext()
    }, 4000)
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current)
    }
  }, [emblaApi, isHovered, shouldReduceMotion])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section
      className="py-14 sm:py-20 overflow-hidden"
      style={{ background: 'linear-gradient(170deg,#eef2fb 0%,#e3eaff 50%,#eef2fb 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="s-badge mb-4">✦ Real Travelers, Real Stories ✦</div>
          <h2 className="font-display font-black text-[#0d1b2a]" style={{ fontSize: 'clamp(1.9rem,5vw,3rem)', lineHeight: 1.1 }}>
            Travelers <span className="gradient-text">Love Vyatri</span>
          </h2>
        </motion.div>

        {/* ── Embla carousel ── */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Carousel viewport */}
          <div
            ref={emblaRef}
            className="overflow-hidden"
            aria-live="polite"
            aria-label="Customer testimonials carousel"
          >
            <div className="flex gap-4 sm:gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={t.name}
                  className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                >
                  <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-lg border border-blue-50 h-full flex flex-col relative overflow-hidden">
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1a3875] via-[#ff6b1a] to-[#00c87a]" />
                    <Quote size={28} className="text-[#ff6b1a]/15 absolute top-4 right-4" aria-hidden="true" />

                    {/* Stars */}
                    <div className="flex gap-0.5 mb-3" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" aria-hidden="true" />
                      ))}
                    </div>

                    <blockquote className="text-[#0d1b2a] text-sm sm:text-base font-medium leading-relaxed mb-5 flex-1">
                      "{t.review}"
                    </blockquote>

                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={t.image}
                          alt={`${t.name} profile photo — verified Vyatri traveller`}
                          fill
                          className="rounded-full object-cover ring-2 ring-[#ff6b1a]/30"
                          sizes="56px"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-[#0d1b2a] text-sm">{t.name}</div>
                        <div className="text-gray-400 text-xs">{t.location} · <span className="text-[#ff6b1a] font-medium">{t.trip}</span></div>
                      </div>
                      <span className="ml-auto text-xs font-semibold text-emerald-500 flex-shrink-0">✅ Verified</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-5 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-gray-200 hover:border-[#1a3875] hover:text-[#1a3875] flex items-center justify-center shadow-md transition-all active:scale-95 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-5 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-gray-200 hover:border-[#1a3875] hover:text-[#1a3875] flex items-center justify-center shadow-md transition-all active:scale-95 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`rounded-full transition-all duration-200 ${i === selectedIndex ? 'w-8 h-2.5 bg-[#ff6b1a]' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
