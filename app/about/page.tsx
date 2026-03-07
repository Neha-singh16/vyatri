import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Us | Vyatri Trip Planner',
  description: 'Learn about Vyatri Trip Planner — Delhi-based group adventure travel company. Our story, team, and why we do what we do.',
}

const team = [
  {
    name: 'Aryan Kapoor',
    role: 'Founder & Head of Experiences',
    bio: '8 years of backpacking across India and Southeast Asia. Quit corporate life to create group adventures for solo travelers.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Ishaan Malhotra',
    role: 'Co-Founder & Operations Head',
    bio: 'Ex-travel journalist who has covered 40+ countries. Manages the on-ground experience for all Vyatri trips.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  },
  {
    name: 'Priya Singh',
    role: 'Lead Trip Designer',
    bio: 'Himalayan trekking enthusiast and certified mountain guide. Creates all our domestic Himachal and Uttarakhand itineraries.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
]

const stats = [
  { value: '100+', label: 'Trips Completed' },
  { value: '5,000+', label: 'Happy Travelers' },
  { value: '20+', label: 'Destinations' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '3+', label: 'Years Experience' },
  { value: '0', label: 'Unhappy Travelers 😄' },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80"
          alt="About Vyatri"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Our Story</div>
            <h1 className="text-4xl sm:text-5xl font-black">About Vyatri</h1>
            <p className="text-white/80 mt-3 max-w-xl">Creating unforgettable adventures since 2022</p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">The Beginning</div>
            <h2 className="text-3xl font-black text-dark mb-4">Born from a Solo Trip Gone Right</h2>
            <div className="space-y-4 text-gray-500 leading-relaxed">
              <p>
                Vyatri started in 2022 when our founder Aryan booked a solo trip to Spiti Valley and found himself surrounded by 15 strangers who became his closest friends. That week changed his life.
              </p>
              <p>
                He came back to Delhi with one mission: recreate that magic for every solo traveler who dreams of adventure but hesitates to go alone. Vyatri was born.
              </p>
              <p>
                Today, we've taken 5,000+ travelers across India and abroad — from the cold deserts of Ladakh to the beaches of Bali. We're a small Delhi-based team with big dreams and an uncompromising commitment to real, authentic travel experiences.
              </p>
            </div>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
              alt="Our Story"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="text-white">
                <div className="text-2xl sm:text-3xl font-black text-accent">{stat.value}</div>
                <div className="text-white/70 text-xs sm:text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Meet the Team</div>
          <h2 className="text-3xl font-black text-dark">The People Behind Vyatri</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative w-28 h-28 mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-full ring-4 ring-accent/20"
                />
              </div>
              <h3 className="font-bold text-dark text-lg">{member.name}</h3>
              <div className="text-accent text-sm font-medium mt-0.5">{member.role}</div>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-dark mb-4">Our Promise to You</h2>
          <p className="text-gray-500 mb-10">Every Vyatri trip is built on these core principles</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'Transparency', icon: '🔍', desc: 'No hidden costs. What you see is what you pay. Clear inclusions & exclusions for every trip.' },
              { title: 'Safety First', icon: '🛡️', desc: 'All our stays are verified. Every trip has an experienced leader and 24/7 emergency support.' },
              { title: 'Sustainable Travel', icon: '🌿', desc: 'We support local communities, avoid over-touristed routes, and promote responsible travel.' },
            ].map((v) => (
              <div key={v.title} className="bg-warm rounded-2xl p-6 shadow-sm">
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-dark mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
