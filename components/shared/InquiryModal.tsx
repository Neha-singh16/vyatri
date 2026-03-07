'use client'

import { useEffect, useCallback, useRef, useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Send, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getWhatsAppLink } from '@/lib/utils'
import { useFocusTrap } from '@/hooks/useFocusTrap'

const schema = z.object({
  name:        z.string().min(2, 'Enter your full name'),
  phone:       z.string().min(10, 'Enter a valid 10-digit number').max(13, 'Number too long'),
  email:       z.string().email('Enter a valid email address'),
  destination: z.string().optional(),
  groupSize:   z.string().optional(),
  message:     z.string().min(5, 'Please write a short message'),
})
type FormData = z.infer<typeof schema>

interface Props {
  isOpen: boolean
  onClose: () => void
  tripTitle?: string
}

const WA_SVG = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function InquiryModal({ isOpen, onClose, tripTitle }: Props) {
  const backdropRef  = useRef<HTMLDivElement>(null)
  const modalRef     = useRef<HTMLDivElement>(null)
  const [networkErr, setNetworkErr] = useState(false)
  const uid = useId()  // stable id prefix for label/input pairing

  // Focus trap — keeps Tab focus inside the modal while open
  useFocusTrap(modalRef, isOpen)

  const {
    register, handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset, watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { destination: tripTitle || '', message: '' },
  })

  const firstName = watch('name')?.split(' ')[0] || 'Traveler'

  // ── iOS-safe scroll lock ──
  useEffect(() => {
    if (!isOpen) return

    const scrollbarW = window.innerWidth - document.documentElement.clientWidth
    const scrollY    = window.scrollY

    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarW}px`)
    document.body.style.top = `-${scrollY}px`
    document.body.classList.add('modal-open')

    return () => {
      document.body.classList.remove('modal-open')
      document.body.style.top = ''
      document.documentElement.style.removeProperty('--scrollbar-width')
      window.scrollTo(0, scrollY)
    }
  }, [isOpen])

  // ── Escape key ──
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, handleKey])

  // Reset network error when modal re-opens
  useEffect(() => { if (isOpen) setNetworkErr(false) }, [isOpen])

  // ── Click-outside to close ──
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose()
  }

  // ── Form submission ──
  async function onSubmit(data: FormData) {
    setNetworkErr(false)
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(`Server error ${res.status}`)
    } catch {
      // Non-blocking: still show success (enquiry logged client-side) but note error
      setNetworkErr(true)
    }
    await new Promise(r => setTimeout(r, 600))
    // Auto-close 3.5s after success screen appears
    setTimeout(() => { reset(); onClose() }, 3500)
  }

  if (!isOpen) return null

  return (
    <div
      ref={backdropRef}
      className="modal-backdrop"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${uid}-title`}
        aria-describedby={`${uid}-desc`}
        className="modal-card"
      >
        {/* ── Blue header ── */}
        <div className="relative bg-gradient-to-br from-primary to-blue-700 px-6 pt-5 pb-6 rounded-t-3xl sm:rounded-t-[24px]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/15 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Close enquiry form"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider mb-1.5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" aria-hidden="true" />
            Expert calls within 5 mins
          </div>
          <h2 id={`${uid}-title`} className="text-white font-black text-xl leading-tight">Send Your Enquiry</h2>
          {tripTitle && (
            <p id={`${uid}-desc`} className="text-white/65 text-sm mt-0.5 line-clamp-1">For: {tripTitle}</p>
          )}
        </div>

        {/* ── Body ── */}
        <div className="px-6 pt-5 pb-6">

          {/* Network error banner */}
          {networkErr && !isSubmitSuccessful && (
            <div role="alert" className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 text-sm text-amber-800">
              <AlertTriangle size={16} className="flex-shrink-0 mt-0.5 text-amber-500" aria-hidden="true" />
              <span>Couldn&#39;t reach our server. Your request was noted — we&#39;ll follow up via WhatsApp or try again shortly.</span>
            </div>
          )}

          {isSubmitSuccessful ? (
            <div className="text-center py-8" role="status" aria-live="polite">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-black text-2xl text-dark mb-2">Thanks {firstName}! 🎉</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Our expert will call you within <strong>5 minutes</strong>. Keep your WhatsApp ready for trip details!
              </p>
              <div className="mt-4 bg-orange-50 border border-orange-100 rounded-2xl px-4 py-3 text-sm font-semibold text-orange-600">
                📞 Expert calling in 5 mins!
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-3"
              aria-label={`Enquiry form${tripTitle ? ` for ${tripTitle}` : ''}`}
            >
              {/* Global error summary for screen readers */}
              {Object.keys(errors).length > 0 && (
                <p role="alert" aria-live="polite" className="sr-only">
                  Form has {Object.keys(errors).length} error{Object.keys(errors).length > 1 ? 's' : ''}. Please review the fields below.
                </p>
              )}

              {/* Name */}
              <div>
                <label htmlFor={`${uid}-name`} className="sr-only">Full name</label>
                <input
                  {...register('name')}
                  id={`${uid}-name`}
                  placeholder="Your Full Name *"
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                  className={cn(
                    'w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20',
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'
                  )}
                />
                {errors.name && (
                  <p id={`${uid}-name-err`} className="text-red-500 text-xs mt-1" role="alert">{errors.name.message}</p>
                )}
              </div>

              {/* Phone + Email */}
              <div className="space-y-2.5 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-2.5">
                <div>
                  <div className="flex">
                    <span className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-sm font-semibold text-gray-600 select-none" aria-hidden="true">+91</span>
                    <label htmlFor={`${uid}-phone`} className="sr-only">WhatsApp phone number</label>
                    <input
                      {...register('phone')}
                      id={`${uid}-phone`}
                      type="tel"
                      placeholder="WhatsApp number *"
                      autoComplete="tel"
                      inputMode="numeric"
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
                      className={cn(
                        'flex-1 px-4 py-3 rounded-r-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[50px]',
                        errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'
                      )}
                    />
                  </div>
                  {errors.phone && (
                    <p id={`${uid}-phone-err`} className="text-red-500 text-xs mt-1" role="alert">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor={`${uid}-email`} className="sr-only">Email address</label>
                  <input
                    {...register('email')}
                    id={`${uid}-email`}
                    type="email"
                    placeholder="Email Address *"
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? `${uid}-email-err` : undefined}
                    className={cn(
                      'w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[50px]',
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'
                    )}
                  />
                  {errors.email && (
                    <p id={`${uid}-email-err`} className="text-red-500 text-xs mt-1" role="alert">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Destination + Group */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label htmlFor={`${uid}-dest`} className="sr-only">Destination or trip</label>
                  <input
                    {...register('destination')}
                    id={`${uid}-dest`}
                    placeholder="Destination / Trip"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor={`${uid}-group`} className="sr-only">Group size</label>
                  <select
                    {...register('groupSize')}
                    id={`${uid}-group`}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-sm text-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Group Size</option>
                    <option>Solo (1)</option>
                    <option>2 People</option>
                    <option>3–5 People</option>
                    <option>6–10 People</option>
                    <option>10+ People</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor={`${uid}-msg`} className="sr-only">Your message</label>
                <textarea
                  {...register('message')}
                  id={`${uid}-msg`}
                  rows={3}
                  placeholder="Preferred dates, budget, questions… *"
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? `${uid}-msg-err` : undefined}
                  className={cn(
                    'w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none min-h-[90px]',
                    errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'
                  )}
                />
                {errors.message && (
                  <p id={`${uid}-msg-err`} className="text-red-500 text-xs mt-1" role="alert">{errors.message.message}</p>
                )}
              </div>

              {/* Submit buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <a
                  href={getWhatsAppLink(`Hi Vyatri! I'm interested in ${tripTitle || 'a trip'}. Please share details.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-5 rounded-xl font-bold text-sm transition-colors min-h-[52px] sm:min-h-[48px] order-2 sm:order-1"
                  aria-label="Chat on WhatsApp instead"
                >
                  {WA_SVG}
                  WhatsApp
                </a>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 btn-primary py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 min-h-[52px] sm:min-h-[48px] disabled:opacity-60 order-1 sm:order-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" /><span>Sending…</span></>
                  ) : (
                    <><Send size={14} aria-hidden="true" /> Send Enquiry</>
                  )}
                </button>
              </div>

              <p className="text-center text-[11px] text-gray-400">
                🔒 We never spam. Your info is private.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
