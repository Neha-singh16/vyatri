import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Vyatri Trip Planner',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-3xl font-black text-dark mb-6">Terms & Conditions</h1>
      <p className="text-gray-400 text-sm mb-8">Last updated: January 2026</p>
      <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
        <h2 className="text-xl font-bold text-dark">Bookings & Payments</h2>
        <p>A non-refundable token advance is required to confirm your booking. Balance payment must be made before trip departure.</p>
        <h2 className="text-xl font-bold text-dark">Cancellation Policy</h2>
        <ul className="space-y-1 list-disc pl-4">
          <li>30+ days before trip: Full refund</li>
          <li>15-30 days: 50% refund</li>
          <li>7-15 days: 25% refund</li>
          <li>Under 7 days: No refund (batch transfer available)</li>
        </ul>
        <h2 className="text-xl font-bold text-dark">Liability</h2>
        <p>Vyatri Trip Planner acts as a travel coordinator. We are not liable for delays, force majeure events, or personal accidents during trips. We strongly recommend travel insurance.</p>
        <h2 className="text-xl font-bold text-dark">Contact</h2>
        <p>For any disputes, contact <a href="mailto:hello@vyatri.in" className="text-primary">hello@vyatri.in</a></p>
      </div>
    </div>
  )
}
