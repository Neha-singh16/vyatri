import type { Metadata } from 'next'
import FAQAccordion from '@/components/shared/FAQAccordion'

export const metadata: Metadata = {
  title: 'FAQ | Frequently Asked Questions',
  description: 'Answers to the most common questions about Vyatri group trips — bookings, payments, safety, cancellations, and more.',
}

const allFAQs = [
  {
    q: "Do I need to know anyone to join a Vyatri group trip?",
    a: "Not at all! Our trips are designed for solo travelers. You'll be matched with 10-20 like-minded explorers. Most of our solo travelers end up making lifelong friends on our trips."
  },
  {
    q: "What's included in the trip cost?",
    a: "The trip cost includes transport (from the mentioned departure point), accommodation, meals as specified in the itinerary, experienced trip leader/guide, and all sightseeing as per plan. Flights are included only when mentioned."
  },
  {
    q: "How do I book? Do I need to pay full amount upfront?",
    a: "You can book by filling the inquiry form or WhatsApp-ing us. We require a token advance of ₹2,000-5,000 to confirm your seat. The balance can be paid before departure. No surprise charges!"
  },
  {
    q: "Is it safe for solo female travelers?",
    a: "Absolutely yes! About 40% of our travelers are solo women. We have mixed gender groups, experienced trip leaders, verified safe accommodations, and 24/7 support. Safety is our top priority."
  },
  {
    q: "What if I need to cancel my booking?",
    a: "We have a flexible cancellation policy. Full refund if cancelled 30+ days before trip. 50% refund for 15-30 days. 25% refund for 7-15 days. No refund within 7 days (but we can transfer to another batch)."
  },
  {
    q: "What is the age range for Vyatri trips?",
    a: "Our trips typically attract travelers between 20-40 years old, though we welcome anyone from 18+. We have some special trips for families and senior travelers as well."
  },
  {
    q: "Do I need travel insurance?",
    a: "We strongly recommend buying travel insurance before any trip, especially for treks or international travel. We can guide you on what coverage to look for."
  },
  {
    q: "What kind of accommodation is provided?",
    a: "Depending on the trip, accommodation ranges from hotel rooms (double/triple sharing) to local homestays and tented camps. All stays are personally verified by our team for quality and safety."
  },
  {
    q: "Are meals vegetarian/non-vegetarian?",
    a: "We accommodate all dietary preferences. Our itineraries mention meals included. When meals are provided, we ensure options for both vegetarian and non-vegetarian travelers."
  },
  {
    q: "How fit do I need to be for a trek?",
    a: "Our trek difficulty levels are clearly mentioned on each trip page (Easy, Moderate, Difficult). Easy treks are suitable for anyone with basic fitness. Moderate treks require prior walking experience."
  },
  {
    q: "Can I join a trip with my group of friends?",
    a: "Absolutely! You can book multiple seats together. If you have a group of 8+, you can even request a private trip customized for your group."
  },
  {
    q: "What if I want a custom trip?",
    a: "We offer fully customized private group trips for 8+ people. Contact us on WhatsApp with your requirements — destination, dates, budget — and we'll design a perfect itinerary."
  },
  {
    q: "Are Vyatri trips suitable for first-time travelers?",
    a: "Yes! We actually love first-timers. Our trip leaders take extra care of first-time travelers. All logistics are pre-planned so you just need to show up with a smile."
  },
  {
    q: "What should I pack for a Vyatri trip?",
    a: "We send a detailed packing list after booking based on your specific trip. Generally, pack light (30L backpack), include layers for cold weather, comfortable walking shoes, and personal medications."
  },
  {
    q: "How do I contact support during a trip?",
    a: "Every trip has a dedicated trip leader/coordinator who's accessible 24/7 via WhatsApp. You'll also have Vyatri's office number for emergencies."
  },
  {
    q: "Do Vyatri trips include international flights?",
    a: "International packages that include flights clearly mention so. For some international packages, flights are optional/separately booked. We help coordinate flight bookings if needed."
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept UPI, bank transfer, credit/debit cards, and EMI options for higher-value trips. All payments are secure and you receive instant confirmation."
  },
  {
    q: "Do you offer EMI for expensive trips?",
    a: "Yes! For trips above ₹20,000, we offer no-cost EMI in partnership with select credit card banks. Ask our team for details when booking."
  },
  {
    q: "Are permits included in trip costs?",
    a: "All necessary permits (like Inner Line Permits for Ladakh/Spiti, Bhutan permits, etc.) are arranged and included in the trip cost unless explicitly stated in exclusions."
  },
  {
    q: "What happens if the trip is cancelled by Vyatri?",
    a: "In the rare case of Vyatri cancelling a trip (due to natural disasters, government orders, etc.), you get a 100% full refund or free transfer to the next available batch."
  },
]

export default function FAQPage() {
  return (
    <div>
      {/* Header */}
      <div className="bg-primary py-16 text-center px-4">
        <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Help Center</div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">Frequently Asked Questions</h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          Everything you need to know about booking a Vyatri trip. Can't find your answer?{' '}
          <a href="/contact" className="text-accent hover:text-white transition-colors">Contact us</a>.
        </p>
      </div>

      {/* FAQ Grid */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <FAQAccordion items={allFAQs} />
      </div>

      {/* Bottom CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-accent rounded-2xl p-8 text-center text-white">
          <h3 className="font-bold text-xl mb-2">Still have questions?</h3>
          <p className="text-white/80 mb-6">Our travel experts are available Mon–Sat 9AM–7PM</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-accent px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/90 transition-all"
            >
              WhatsApp Us
            </a>
            <a
              href="tel:+919876543210"
              className="border-2 border-white text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-all"
            >
              Call +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
