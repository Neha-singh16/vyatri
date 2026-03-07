import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, Tag } from 'lucide-react'
import blogsData from '@/data/blogs.json'
import type { Blog } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Travel Blog | Destination Guides & Travel Tips',
  description: 'Vyatri travel blog — destination guides, packing tips, budget travel advice, and first-hand trip stories from across India and abroad.',
}

export default function BlogsPage() {
  const blogs: Blog[] = blogsData as Blog[]

  return (
    <div>
      {/* Header */}
      <div className="bg-primary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Travel Stories</div>
          <h1 className="text-4xl sm:text-5xl font-black mb-3">Vyatri Travel Blog</h1>
          <p className="text-white/70 text-lg">Destination guides, travel tips, and stories from the road</p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Featured Post */}
        <Link href={`/blogs/${blogs[0].slug}`} className="block mb-12 group">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <Image
                src={blogs[0].image}
                alt={blogs[0].title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold">
                Featured
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">{blogs[0].category}</span>
              <h2 className="text-2xl sm:text-3xl font-black text-dark mt-2 mb-3 group-hover:text-primary transition-colors">
                {blogs[0].title}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">{blogs[0].excerpt}</p>
              <div className="flex items-center gap-3 sm:gap-4 text-sm text-gray-400 flex-wrap">
                <Image
                  src={blogs[0].authorImage}
                  alt={blogs[0].author}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
                <span>{blogs[0].author}</span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  {new Date(blogs[0].publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={13} />
                  {blogs[0].readTime}
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Rest of Blogs */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(1).map((blog) => (
            <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 text-primary px-2.5 py-1 rounded-lg text-xs font-semibold">
                    {blog.category}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-dark text-base leading-tight group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">{blog.excerpt}</p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {blog.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
