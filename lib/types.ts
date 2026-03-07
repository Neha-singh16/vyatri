export interface Trip {
  id: string
  slug: string
  title: string
  subtitle: string
  category: string
  tags: string[]
  duration: string
  days: number
  price: number
  originalPrice: number
  groupSize: string
  startDate: string
  endDate: string
  nextBatch: string
  difficulty: string
  image: string
  gallery: string[]
  departure: string
  highlights: string[]
  inclusions: string[]
  exclusions: string[]
  itinerary: ItineraryDay[]
  description: string
  rating: number
  reviews: number
  badge: string
}

export interface ItineraryDay {
  day: number
  title: string
  desc: string
}

export interface Blog {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  authorImage: string
  publishedAt: string
  readTime: string
  image: string
  tags: string[]
}

export interface EnquiryForm {
  name: string
  phone: string
  email: string
  destination?: string
  travelDate?: string
  groupSize?: string
  message: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  trip: string
  rating: number
  review: string
  image: string
}
