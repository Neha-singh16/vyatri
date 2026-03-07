'use client'

import { useState, useEffect } from 'react'
import InquiryModal from '@/components/shared/InquiryModal'

interface Props {
  tripTitle?: string
  className?: string
  children?: React.ReactNode
  onClick?: () => void
}

export default function InquiryTrigger({ tripTitle, className, children, onClick }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setOpen(true)
    document.addEventListener('open-inquiry', handler)
    return () => document.removeEventListener('open-inquiry', handler)
  }, [])

  const handleClick = () => {
    onClick?.()
    setOpen(true)
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={className || 'btn-primary px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-bold min-h-[38px] sm:min-h-[42px] flex-shrink-0'}
        aria-label={`Enquire about ${tripTitle || 'this trip'}`}
      >
        {children || 'Book Now'}
      </button>
      <InquiryModal isOpen={open} onClose={() => setOpen(false)} tripTitle={tripTitle} />
    </>
  )
}
