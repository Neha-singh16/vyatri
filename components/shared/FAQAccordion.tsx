'use client'

import { useState, useRef } from 'react'
import { Plus, Minus } from 'lucide-react'

const defaultFaqs = [
  {
    q: "Do I need to know anyone to join a Vyatri group trip?",
    a: "Not at all! Our trips are designed for solo travelers. You'll join 10–20 like-minded explorers. Most solo travelers make lifelong friends on our trips.",
  },
  {
    q: "What's included in the trip cost?",
    a: "Transport (from departure point), accommodation, meals as listed, experienced trip leader, and sightseeing per the itinerary. Flights included only when explicitly stated.",
  },
  {
    q: "How do I book? Do I need to pay the full amount upfront?",
    a: "Fill the enquiry form or WhatsApp us. We require a token advance of ₹2,000–5,000 to confirm your seat. The balance is due before departure. No hidden charges.",
  },
  {
    q: "Is it safe for solo female travelers?",
    a: "Absolutely! ~40% of our travelers are solo women. We have mixed groups, experienced trip leaders, verified safe stays, and 24/7 emergency support. Safety is our top priority.",
  },
  {
    q: "What if I need to cancel?",
    a: "Full refund if cancelled 30+ days before. 50% refund for 15–30 days. 25% for 7–15 days. Within 7 days: no refund, but we transfer you to the next batch at no extra cost.",
  },
]

interface FAQItem {
  q: string
  a: string
}

interface Props {
  items?: FAQItem[]
}

function FAQItem({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null)

  return (
    <div className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen ? 'border-orange-200 shadow-sm' : 'border-gray-100 hover:border-gray-200'}`}>
      <button
        onClick={onClick}
        className="w-full flex items-start justify-between px-5 py-4 text-left gap-3 min-h-[56px]"
        aria-expanded={isOpen}
      >
        <span className={`font-semibold text-sm sm:text-base transition-colors ${isOpen ? 'text-primary' : 'text-dark'}`}>
          {item.q}
        </span>
        <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors mt-0.5 ${isOpen ? 'bg-accent text-white' : 'bg-gray-100 text-gray-500'}`}>
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>

      {/* CSS-transition drawer */}
      <div
        ref={bodyRef}
        style={{
          maxHeight: isOpen ? '400px' : '0',
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 0.28s ease, opacity 0.2s ease',
        }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-4 pt-1 text-gray-500 text-sm leading-relaxed border-t border-gray-50">
          {item.a}
        </div>
      </div>
    </div>
  )
}

export default function FAQAccordion({ items = defaultFaqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-2.5">
      {items.map((item, i) => (
        <FAQItem
          key={i}
          item={item}
          isOpen={openIndex === i}
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  )
}
