import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'
import blogsData from '@/data/blogs.json'
import type { Blog } from '@/lib/types'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = (blogsData as Blog[]).find((b) => b.slug === params.slug)
  if (!blog) return {}
  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: { images: [blog.image] },
  }
}

export function generateStaticParams() {
  return (blogsData as Blog[]).map((b) => ({ slug: b.slug }))
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = (blogsData as Blog[]).find((b) => b.slug === params.slug)
  if (!blog) notFound()

  const related = (blogsData as Blog[]).filter((b) => b.id !== blog.id).slice(0, 2)

  return (
    <div>
      {/* Hero Image */}
      <div className="relative h-72 sm:h-96 lg:h-[500px] overflow-hidden">
        <Image src={blog.image} alt={blog.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">{blog.category}</div>
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">{blog.title}</h1>
            <div className="flex items-center gap-4 mt-4 text-white/70 text-sm flex-wrap">
              <Image
                src={blog.authorImage}
                alt={blog.author}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <span className="text-white/90 font-medium">{blog.author}</span>
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                {new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={13} />
                {blog.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/blogs" className="inline-flex items-center gap-1.5 text-primary hover:text-accent text-sm font-medium mb-8 transition-colors">
          <ArrowLeft size={15} />
          Back to Blog
        </Link>

        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-500 leading-relaxed font-medium mb-6">{blog.excerpt}</p>
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>
              Whether you're a first-time traveler or a seasoned backpacker, this destination has something special to offer. In this comprehensive guide, we cover everything you need to know to plan an unforgettable trip.
            </p>
            <h2 className="text-xl font-bold text-dark mt-8 mb-3">Getting There</h2>
            <p>
              The best way to reach this destination from Delhi depends on your budget and time. We recommend booking tickets at least 3-4 weeks in advance for the best rates.
            </p>
            <h2 className="text-xl font-bold text-dark mt-8 mb-3">Best Time to Visit</h2>
            <p>
              February through April offers the best weather conditions. The skies are clear, temperatures are comfortable, and crowds are manageable compared to peak summer season.
            </p>
            <h2 className="text-xl font-bold text-dark mt-8 mb-3">Where to Stay</h2>
            <p>
              From budget homestays to boutique guesthouses, accommodation options suit all budgets. We recommend staying with local families for the most authentic experience.
            </p>
            <h2 className="text-xl font-bold text-dark mt-8 mb-3">What to Eat</h2>
            <p>
              The local cuisine is a highlight in itself. Don't miss the street food — it's cheap, delicious, and gives you an authentic taste of local life.
            </p>
            <h2 className="text-xl font-bold text-dark mt-8 mb-3">Pro Tips from Vyatri</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                Book group trips for better value and built-in companions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                Travel light — 30L backpack is ideal for most trips
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                Always carry cash — ATMs can be unreliable in remote areas
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                Respect local customs and dress appropriately at religious sites
              </li>
            </ul>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-10 pt-10 border-t border-gray-100">
          {blog.tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1 bg-primary/5 text-primary px-3 py-1.5 rounded-full text-xs font-medium">
              <Tag size={11} />
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 bg-primary rounded-2xl p-6 text-white text-center">
          <h3 className="font-bold text-xl mb-2">Plan This Trip with Vyatri</h3>
          <p className="text-white/70 text-sm mb-4">Join our next group trip and experience this destination with like-minded travelers.</p>
          <a
            href="/destinations/domestic"
            className="inline-block bg-accent hover:bg-accent-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all"
          >
            View Upcoming Trips
          </a>
        </div>
      </div>

      {/* Related Posts */}
      {related.length > 0 && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <h3 className="text-xl font-bold text-dark mb-6">More from the Blog</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map((b) => (
              <Link key={b.id} href={`/blogs/${b.slug}`} className="group flex gap-4">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={b.image} alt={b.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div>
                  <div className="text-xs text-accent font-medium">{b.category}</div>
                  <h4 className="font-bold text-dark text-sm mt-1 line-clamp-2 group-hover:text-primary transition-colors">{b.title}</h4>
                  <div className="text-gray-400 text-xs mt-1">{b.readTime}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
