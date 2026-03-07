'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  { name:'Priya Sharma',  location:'Delhi',   trip:'Spiti Valley 7D',    rating:5,
    review:"Vyatri made my solo Spiti dream come true! I was terrified going alone but the group was incredible. Guide Ramesh was world-class. Already booked Bhutan! 🏔️",
    image:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80' },
  { name:'Aditya Verma',  location:'Gurgaon', trip:'Thailand 7D',         rating:5,
    review:"Best group trip ever. Everything perfectly organized — flights, transfers, hotels. The Thailand package was insane value. Made 6 best friends for life! ✈️",
    image:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
  { name:'Sneha Patel',   location:'Noida',   trip:'Kasol & Kheerganga', rating:5,
    review:"Kheerganga was breathtaking — camping under a billion stars and soaking in natural hot springs at midnight. Vyatri's trip leader was so caring! 🌟",
    image:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80' },
  { name:'Rohit Gupta',   location:'Delhi',   trip:'Bhutan 7D',           rating:5,
    review:"Bhutan was life-changing. Tiger's Nest, Punakha Dzong — Vyatri showed us the real Bhutan. The group felt like family by Day 2. 🙏",
    image:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80' },
]

export default function Testimonials() {
  const [cur, setCur] = useState(0)
  const prev = () => setCur(c => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCur(c => (c + 1) % testimonials.length)
  const t = testimonials[cur]

  return (
    <section className="py-14 sm:py-20" style={{
      background:'linear-gradient(170deg,#eef2fb 0%,#e3eaff 50%,#eef2fb 100%)'
    }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="s-badge mb-4">✦ Real Travelers, Real Stories ✦</div>
          <h2 className="font-display font-black text-[#0d1b2a]" style={{ fontSize:'clamp(1.9rem,5vw,3rem)',lineHeight:1.1 }}>
            Travelers <span className="gradient-text">Love Vyatri</span>
          </h2>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden mb-5 border border-blue-50">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1a3875] via-[#ff6b1a] to-[#00c87a]" />
          <Quote size={40} className="text-[#ff6b1a]/15 absolute top-6 right-6" />

          {/* Stars */}
          <div className="flex gap-1 mb-4">
            {Array.from({length:t.rating}).map((_,i) => (
              <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          <blockquote className="text-[#0d1b2a] text-base sm:text-xl font-medium leading-relaxed mb-7">
            "{t.review}"
          </blockquote>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
                <Image src={t.image} alt={t.name} fill
                  className="rounded-full object-cover ring-2 ring-[#ff6b1a]/30" sizes="56px" />
              </div>
              <div>
                <div className="font-bold text-[#0d1b2a] text-sm sm:text-base">{t.name}</div>
                <div className="text-gray-400 text-xs sm:text-sm">{t.location} · <span className="text-[#ff6b1a] font-medium">{t.trip}</span></div>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">✅ Verified Traveler</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prev}
            className="w-11 h-11 rounded-full bg-white border border-gray-200 hover:border-[#1a3875] hover:text-[#1a3875] flex items-center justify-center shadow-sm transition-all active:scale-95"
            aria-label="Previous">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_,i) => (
              <button key={i} onClick={() => setCur(i)}
                className={`rounded-full transition-all duration-200 ${i === cur ? 'w-8 h-2.5 bg-[#ff6b1a]' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'}`} />
            ))}
          </div>
          <button onClick={next}
            className="w-11 h-11 rounded-full bg-white border border-gray-200 hover:border-[#1a3875] hover:text-[#1a3875] flex items-center justify-center shadow-sm transition-all active:scale-95"
            aria-label="Next">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Thumbnail tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {testimonials.map((t,i) => (
            <button key={t.name} onClick={() => setCur(i)}
              className={`p-3 sm:p-4 rounded-xl text-left transition-all duration-200 active:scale-95
                ${i === cur ? 'bg-[#1a3875] shadow-md' : 'bg-white border border-gray-100 hover:border-[#1a3875]/25'}`}>
              <div className={`text-xs font-semibold mb-0.5 line-clamp-1 ${i === cur ? 'text-[#ff6b1a]' : 'text-gray-400'}`}>{t.trip}</div>
              <div className={`font-bold text-sm ${i === cur ? 'text-white' : 'text-[#0d1b2a]'}`}>{t.name}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
