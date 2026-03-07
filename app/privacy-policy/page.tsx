import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Vyatri Trip Planner',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-3xl font-black text-dark mb-6">Privacy Policy</h1>
      <p className="text-gray-400 text-sm mb-8">Last updated: January 2026</p>
      <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
        <p>Vyatri Trip Planner ("we", "us") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.</p>
        <h2 className="text-xl font-bold text-dark">Information We Collect</h2>
        <p>We collect name, email, phone number, and travel preferences when you submit an inquiry form or contact us. We do not collect payment information.</p>
        <h2 className="text-xl font-bold text-dark">How We Use Your Information</h2>
        <p>Your information is used solely to respond to your travel inquiries and send relevant trip updates. We never sell your data to third parties.</p>
        <h2 className="text-xl font-bold text-dark">Contact</h2>
        <p>For privacy concerns, email us at <a href="mailto:hello@vyatri.in" className="text-primary">hello@vyatri.in</a></p>
      </div>
    </div>
  )
}
