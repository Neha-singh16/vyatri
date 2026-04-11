'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  phone: z.string().min(10, 'Valid phone required'),
  email: z.string().email('Valid email required'),
  subject: z.string().min(3, 'Subject required'),
  message: z.string().min(20, 'Message too short (min 20 chars)'),
})

type FormData = z.infer<typeof schema>

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch {}
    await new Promise(r => setTimeout(r, 1200))
    setSubmitted(true)
  }

  return (
    <div className="bg-warm min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1a3875] via-blue-900 to-[#0d1b2a] py-16 sm:py-24 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 mesh-warm opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,107,26,0.2) 0, transparent 70%)' }} />
        <div className="relative z-10">
          <div className="s-badge mb-4" style={{ color: '#FCD34D', background: 'rgba(252,211,77,0.15)', borderColor: 'rgba(252,211,77,0.3)' }}>
            📞 Get in Touch
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 font-display">Contact <span className="gradient-text">Vyatri</span></h1>
          <p className="text-white/70 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Have a question about a trip? Want a custom itinerary? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 -mt-8 sm:-mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-orange-100/50">
              <h2 className="text-lg font-black text-[#0d1b2a] mb-2">Let's Talk Travel</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Our travel experts are passionate travelers themselves. Drop us a message and we'll help plan the perfect adventure.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <MapPin size={18} />, title: 'Our Office', content: 'B-24, Connaught Place\nNew Delhi – 110001', color: 'bg-[#1a3875]/10 text-[#1a3875]' },
                  { icon: <Phone size={18} />, title: 'Phone / WhatsApp', content: '+91 87002 89516\nMon–Sat: 9 AM – 7 PM', color: 'bg-green-100 text-green-600', link: 'tel:+918700289516' },
                  { icon: <Mail size={18} />, title: 'Email', content: 'hello@vyatri.in\nReply within 4-6 hours', color: 'bg-orange-100 text-[#ff6b1a]', link: 'mailto:hello@vyatri.in' },
                  { icon: <Clock size={18} />, title: 'Office Hours', content: 'Mon–Sat: 9 AM – 7 PM\nSun: 10 AM – 4 PM', color: 'bg-purple-100 text-purple-600' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', item.color)}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-[#0d1b2a] text-sm">{item.title}</div>
                      {item.link ? (
                        <a href={item.link} className="text-gray-500 text-sm hover:text-[#ff6b1a] transition-colors whitespace-pre-line">
                          {item.content}
                        </a>
                      ) : (
                        <div className="text-gray-500 text-sm whitespace-pre-line">{item.content}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/918700289516?text=Hi%20Vyatri!%20I%20want%20to%20enquire%20about%20a%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] active:scale-[.98] text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-green-500/25 min-h-[52px]"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-orange-100/50 p-5 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b1a] to-[#ea5a0b] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Send size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0d1b2a] text-lg">Send Us a Message</h3>
                  <p className="text-gray-400 text-xs">We'll reply within 4-6 hours</p>
                </div>
              </div>

              {submitted ? (
                <div className="text-center py-12 animate-fade-up">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-500" size={40} />
                  </div>
                  <h3 className="font-bold text-2xl text-dark mb-2">Message Received! 🎉</h3>
                  <p className="text-gray-500 max-w-sm mx-auto text-sm">
                    Thanks for reaching out! Our team will reply within 4-6 hours.
                    For instant response, WhatsApp us.
                  </p>
                  <a
                    href="https://wa.me/918700289516"
                    className="mt-6 inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold text-sm"
                  >
                    WhatsApp Us
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-semibold text-[#0d1b2a] mb-1.5">Name <span className="text-red-400">*</span></label>
                      <input
                        id="contact-name"
                        {...register('name')}
                        placeholder="Your full name"
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3875]/30 focus:border-[#1a3875]/50 transition-all min-h-[48px]",
                          errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/80 focus:bg-white"
                        )}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1" role="alert">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-semibold text-[#0d1b2a] mb-1.5">Phone <span className="text-red-400">*</span></label>
                      <input
                        id="contact-phone"
                        {...register('phone')}
                        type="tel"
                        placeholder="+91 87002 89516"
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3875]/30 focus:border-[#1a3875]/50 transition-all min-h-[48px]",
                          errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/80 focus:bg-white"
                        )}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1" role="alert">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-semibold text-[#0d1b2a] mb-1.5">Email <span className="text-red-400">*</span></label>
                    <input
                      id="contact-email"
                      {...register('email')}
                      type="email"
                      placeholder="your@email.com"
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3875]/30 focus:border-[#1a3875]/50 transition-all min-h-[48px]",
                        errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/80 focus:bg-white"
                      )}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1" role="alert">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-semibold text-[#0d1b2a] mb-1.5">Subject <span className="text-red-400">*</span></label>
                    <input
                      id="contact-subject"
                      {...register('subject')}
                      placeholder="e.g. Enquiry about Spiti Valley trip"
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3875]/30 focus:border-[#1a3875]/50 transition-all min-h-[48px]",
                        errors.subject ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/80 focus:bg-white"
                      )}
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1" role="alert">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-semibold text-[#0d1b2a] mb-1.5">Message <span className="text-red-400">*</span></label>
                    <textarea
                      id="contact-message"
                      {...register('message')}
                      rows={5}
                      placeholder="Tell us about your trip plans, preferred dates, group size, budget..."
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3875]/30 focus:border-[#1a3875]/50 transition-all resize-none",
                        errors.message ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/80 focus:bg-white"
                      )}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1" role="alert">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary disabled:opacity-60 py-3.5 rounded-xl font-bold transition-all hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 min-h-[52px]"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-10 sm:mt-14 bg-white rounded-2xl shadow-md border border-orange-100/50 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="bg-gradient-to-br from-blue-50 to-orange-50 h-48 sm:h-64 flex items-center justify-center">
              <div className="text-center px-4">
                <MapPin size={36} className="mx-auto mb-3 text-[#1a3875]" />
                <p className="font-bold text-[#0d1b2a] text-lg">B-24, Connaught Place</p>
                <p className="text-gray-500 text-sm mt-1">New Delhi – 110001</p>
                <a
                  href="https://maps.google.com/?q=Connaught+Place+New+Delhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[#ff6b1a] text-sm font-semibold hover:text-[#ea5a0b] transition-colors"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center bg-[#0d1b2a]">
              <h3 className="text-white font-bold text-lg mb-4">Ready to Explore?</h3>
              <p className="text-white/60 text-sm mb-5 leading-relaxed">
                Visit our office for a face-to-face consultation, or connect with us online — we're here to make your dream trip happen.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/destinations/domestic" className="btn-primary px-6 py-3 rounded-xl text-sm font-bold">
                  Browse Trips
                </a>
                <a href="tel:+918700289516" className="btn-outline text-white border-white/25 hover:bg-white/10 hover:text-white px-6 py-3 rounded-xl text-sm font-semibold">
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
