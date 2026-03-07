import Link from 'next/link'
import FAQAccordion from '@/components/shared/FAQAccordion'

export default function FAQSection() {
  return (
    <section className="py-14 sm:py-20" style={{
      background:'linear-gradient(170deg,#f7f3ef 0%,#ede8e0 50%,#f7f3ef 100%)'
    }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <div className="s-badge mb-4">✦ Quick Answers ✦</div>
          <h2 className="font-display font-black text-[#0d1b2a]" style={{ fontSize:'clamp(1.9rem,5vw,3rem)',lineHeight:1.1 }}>
            Got <span className="gradient-text">Questions?</span>
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">Quick answers before you book your adventure</p>
        </div>

        <FAQAccordion />

        <div className="text-center mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/faq"
            className="btn-outline px-6 py-2.5 rounded-xl text-sm font-semibold min-h-[44px] flex items-center gap-1">
            View All 20+ FAQs →
          </Link>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
            className="text-[#25D366] hover:text-[#1fbd5a] font-semibold text-sm transition-colors inline-flex items-center gap-1 min-h-[44px]">
            Ask on WhatsApp →
          </a>
        </div>
      </div>
    </section>
  )
}
