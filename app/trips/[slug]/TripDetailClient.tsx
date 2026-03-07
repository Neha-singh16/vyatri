'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Calendar, Users, Clock, Star, MapPin, CheckCircle, XCircle, ChevronLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import TripCard from '@/components/trips/TripCard'
import { cn, formatPrice, BADGE_COLORS } from '@/lib/utils'
import type { Trip } from '@/lib/types'

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  message: z.string().min(5),
})

type FormData = z.infer<typeof schema>

interface Props {
  trip: Trip
  related: Trip[]
}

export default function TripDetailClient({ trip, related }: Props) {
  const [activeImg, setActiveImg] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const badgeClass = BADGE_COLORS[trip.badge] || 'bg-primary text-white'

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    console.log('Trip enquiry:', data)
    await new Promise(r => setTimeout(r, 1000))
    setSubmitted(true)
  }

  return (
    <div>
      {/* Gallery */}
      <div className="bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/destinations/domestic" className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-4 transition-colors">
            <ChevronLeft size={16} />
            Back to Trips
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2 relative h-80 lg:h-96 rounded-2xl overflow-hidden">
              <Image
                src={trip.gallery[activeImg] || trip.image}
                alt={trip.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className={cn('absolute top-4 left-4 badge', badgeClass)}>
                {trip.badge}
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {trip.gallery.slice(1, 3).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i + 1)}
                  className={cn(
                    'relative h-36 lg:h-44 rounded-xl overflow-hidden border-2 transition-all',
                    activeImg === i + 1 ? 'border-accent' : 'border-transparent'
                  )}
                >
                  <Image src={img} alt={`Gallery ${i + 2}`} fill className="object-cover" sizes="33vw" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left - Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Title Block */}
            <div>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <MapPin size={14} />
                <span>From {trip.departure}</span>
                <span>·</span>
                <span className="capitalize">{trip.category}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-dark mb-2">{trip.title}</h1>
              <p className="text-gray-500 text-lg">{trip.subtitle}</p>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-1.5 text-sm">
                  <Clock size={15} className="text-primary" />
                  <span>{trip.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Users size={15} className="text-green-500" />
                  <span>{trip.groupSize}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Calendar size={15} className="text-accent" />
                  <span>Next: {trip.nextBatch}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Star size={15} className="fill-yellow-400 text-yellow-400" />
                  <span>{trip.rating} ({trip.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* About */}
            <div>
              <h2 className="text-xl font-bold text-dark mb-3">About This Trip</h2>
              <p className="text-gray-500 leading-relaxed">{trip.description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-xl font-bold text-dark mb-4">Trip Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {trip.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-primary/5 rounded-xl">
                    <CheckCircle size={16} className="text-primary flex-shrink-0" />
                    <span className="text-sm text-dark">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <h2 className="text-xl font-bold text-dark mb-6">Day-by-Day Itinerary</h2>
              <div className="space-y-0">
                {trip.itinerary.map((day, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-4 pb-6 relative"
                  >
                    {/* Timeline line */}
                    {i < trip.itinerary.length - 1 && (
                      <div className="absolute left-5 top-10 w-0.5 h-full bg-gray-200" />
                    )}
                    
                    {/* Day badge */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center z-10">
                      {day.day}
                    </div>
                    
                    <div className="flex-1 pt-1.5 pb-2">
                      <h3 className="font-bold text-dark">{day.title}</h3>
                      <p className="text-gray-500 text-sm mt-1 leading-relaxed">{day.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Inclusions/Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-2xl p-5">
                <h3 className="font-bold text-dark mb-3 flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-500" />
                  Inclusions
                </h3>
                <ul className="space-y-2">
                  {trip.inclusions.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 rounded-2xl p-5">
                <h3 className="font-bold text-dark mb-3 flex items-center gap-2">
                  <XCircle size={18} className="text-red-400" />
                  Exclusions
                </h3>
                <ul className="space-y-2">
                  {trip.exclusions.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-red-300 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right - Inquiry Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Price Card */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-primary px-6 py-4">
                  <div className="text-white/70 text-sm">Starting from</div>
                  <div className="text-white text-3xl font-black">{formatPrice(trip.price)}</div>
                  <div className="text-accent text-sm mt-0.5 line-through">{formatPrice(trip.originalPrice)}</div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                    <Clock size={14} className="text-primary" />
                    <span>{trip.duration}</span>
                    <span>·</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      trip.difficulty === 'Easy' ? 'bg-green-100 text-green-600' :
                      trip.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>{trip.difficulty}</span>
                  </div>

                  {/* Inquiry Form */}
                  {submitted ? (
                    <div className="text-center py-6">
                      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle size={28} className="text-green-500" />
                      </div>
                      <h3 className="font-bold text-dark mb-1">Enquiry Sent!</h3>
                      <p className="text-gray-400 text-sm">We'll call you within 2 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                      <h3 className="font-bold text-dark text-base">Send Your Query</h3>
                      
                      {[
                        { name: 'name', placeholder: 'Your Name', type: 'text' },
                        { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
                        { name: 'email', placeholder: 'Email Address', type: 'email' },
                      ].map((field) => (
                        <div key={field.name}>
                          <input
                            {...register(field.name as keyof FormData)}
                            type={field.type}
                            placeholder={field.placeholder}
                            className={cn(
                              "w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all",
                              errors[field.name as keyof FormData]
                                ? "border-red-300 bg-red-50"
                                : "border-gray-200 section-warm focus:bg-white"
                            )}
                          />
                        </div>
                      ))}

                      <textarea
                        {...register('message')}
                        rows={3}
                        placeholder="Your message or questions..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 section-warm focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-accent hover:bg-accent-600 disabled:opacity-60 text-white py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg active:scale-95"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                      </button>

                      <a
                        href={`https://wa.me/919876543210?text=Hi! I want to book ${trip.title}. Please share more details.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold text-sm transition-all hover:bg-[#1ebe5d] flex items-center justify-center gap-2"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp Us
                      </a>

                      <p className="text-center text-xs text-gray-400">
                        No spam. Our travel expert calls within 2 hours.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Trips */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black text-dark mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {related.map((t, i) => (
                <TripCard key={t.id} trip={t} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
