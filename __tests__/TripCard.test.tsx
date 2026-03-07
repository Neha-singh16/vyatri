/**
 * @file TripCard.test.tsx
 * Tests for components/trips/TripCard.tsx
 */

import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Trip } from '@/lib/types'

// ─── Module mocks ─────────────────────────────────────────────────────────────

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    className,
    style,
    onLoad,
  }: {
    src: string
    alt: string
    className?: string
    style?: React.CSSProperties
    onLoad?: () => void
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} style={style} onLoad={onLoad} />
  ),
}))

// TripCard renders InquiryModal internally; mock useFocusTrap so the modal
// renders without needing real DOM focus management.
jest.mock('@/hooks/useFocusTrap', () => ({
  useFocusTrap: jest.fn(),
}))

jest.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_t, tag: string) =>
        ({
          children,
          ...rest
        }: {
          children?: React.ReactNode
          [k: string]: unknown
        }) =>
          React.createElement(tag, rest, children),
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}))

// ─── IntersectionObserver stub ────────────────────────────────────────────────

beforeAll(() => {
  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  })
  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  })
})

// ─── Component under test ─────────────────────────────────────────────────────

import TripCard from '@/components/trips/TripCard'

// ─── Mock trip fixture ────────────────────────────────────────────────────────

const mockTrip: Trip = {
  id: '1',
  slug: 'spiti-valley-7d',             // SEATS map has 3 seats → isHot = true
  title: 'Spiti Valley Explorer',
  subtitle: 'Himachal Pradesh · High Altitude',
  category: 'domestic',
  tags: ['adventure'],
  duration: '7 Days',
  days: 7,
  price: 15999,
  originalPrice: 19999,               // discount = Math.round(20.0) = 20 %
  groupSize: '12-15 People',
  startDate: '2026-02-14',
  endDate: '2026-02-20',
  nextBatch: 'Feb 14, 2026',
  difficulty: 'Moderate',
  image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23',
  gallery: [],
  departure: 'Delhi',
  highlights: ['Spiti River Valley'],
  inclusions: ['Transport'],
  exclusions: ['Flights'],
  itinerary: [],
  description: 'Amazing trip',
  rating: 4.8,
  reviews: 42,
  badge: 'Best Seller',
}

// ─── Common setup ─────────────────────────────────────────────────────────────

beforeEach(() => {
  window.scrollTo = jest.fn()
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({}),
  })
  jest.useFakeTimers()
})

afterEach(() => {
  act(() => {
    jest.runOnlyPendingTimers()
  })
  jest.useRealTimers()
})

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('TripCard', () => {
  // ── 1. Trip title ────────────────────────────────────────────────────────

  it('renders trip title', () => {
    render(<TripCard trip={mockTrip} />)
    expect(screen.getByText('Spiti Valley Explorer')).toBeInTheDocument()
  })

  // ── 2. Book Now button ───────────────────────────────────────────────────

  it('renders Book Now button', () => {
    render(<TripCard trip={mockTrip} />)
    expect(screen.getByRole('button', { name: /book now/i })).toBeInTheDocument()
  })

  // ── 3. Clicking Book Now opens the enquiry modal ──────────────────────────

  it('clicking Book Now opens enquiry modal', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<TripCard trip={mockTrip} />)

    await user.click(screen.getByRole('button', { name: /book now/i }))

    // InquiryModal renders with isOpen=true; it should expose a dialog role
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  // ── 4. Trip image alt text ────────────────────────────────────────────────

  it('renders trip image with alt text containing the trip title', () => {
    render(<TripCard trip={mockTrip} />)

    // TripCard passes alt={`${trip.title} tour`} to the Image component
    const img = screen.getByRole('img', { name: /spiti valley explorer/i })
    expect(img).toBeInTheDocument()
  })

  // ── 5. Price formatted in INR ─────────────────────────────────────────────

  it('renders price formatted in INR (contains ₹ symbol)', () => {
    render(<TripCard trip={mockTrip} />)

    // formatPrice uses Intl.NumberFormat with currency: 'INR'
    const priceEl = screen.getAllByText(/₹/)
    expect(priceEl.length).toBeGreaterThanOrEqual(1)
  })

  // ── 6. Duration badge ─────────────────────────────────────────────────────

  it('renders duration badge with "7 Days"', () => {
    render(<TripCard trip={mockTrip} />)
    expect(screen.getByText('7 Days')).toBeInTheDocument()
  })

  // ── 7. Discount badge ─────────────────────────────────────────────────────

  it('renders discount badge when originalPrice > price', () => {
    render(<TripCard trip={mockTrip} />)

    // getDiscountPercent(19999, 15999) → 20; badge text = "-20%"
    expect(screen.getByText('-20%')).toBeInTheDocument()
  })

  // ── 8. Hot seats ribbon ───────────────────────────────────────────────────

  it('shows hot seats ribbon when seatsLeft <= 5', () => {
    render(<TripCard trip={mockTrip} />)

    // TripCard's internal SEATS map has 'spiti-valley-7d': 3
    // isHot = 3 <= 5 = true → ribbon text: "🔥 3 left!"
    expect(screen.getByText(/left!/i)).toBeInTheDocument()
  })
})
