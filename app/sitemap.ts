import type { MetadataRoute } from 'next'
import tripsData from '@/data/trips.json'
import blogsData from '@/data/blogs.json'
import type { Trip } from '@/lib/types'

const BASE = 'https://vyatri.in'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                      lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE}/about`,           lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`,         lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/faq`,             lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/blogs`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/privacy-policy`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms`,           lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/destinations/domestic`,      lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/destinations/international`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/destinations/backpacking`,   lastModified: now, changeFrequency: 'weekly', priority: 0.80 },
    { url: `${BASE}/destinations/weekend`,       lastModified: now, changeFrequency: 'weekly', priority: 0.80 },
    { url: `${BASE}/destinations/local-tours`,   lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
  ]

  const tripRoutes: MetadataRoute.Sitemap = (tripsData as Trip[]).map((trip) => ({
    url: `${BASE}/trips/${trip.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  const blogRoutes: MetadataRoute.Sitemap = (blogsData as { slug: string }[]).map((blog) => ({
    url: `${BASE}/blogs/${blog.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...tripRoutes, ...blogRoutes]
}
