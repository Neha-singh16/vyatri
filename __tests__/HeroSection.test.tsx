/**
 * @file HeroSection.test.tsx
 * Tests for components/home/HeroSection.tsx
 */

import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// ─── Module mocks ─────────────────────────────────────────────────────────────

// mockPush is declared with the "mock" prefix so Jest's babel hoisting allows
// it to be referenced inside the jest.mock factory below.
const mockPush = jest.fn()

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
  useRouter: jest.fn().mockReturnValue({ push: mockPush }),
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
  useAnimation: () => ({ start: jest.fn() }),
  useInView: () => true,
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

import HeroSection from '@/components/home/HeroSection'

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('HeroSection', () => {
  beforeEach(() => {
    mockPush.mockClear()
    jest.useFakeTimers()
    render(<HeroSection />)
  })

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers()
    })
    jest.useRealTimers()
  })

  // ── 1. Hero section landmark ──────────────────────────────────────────────

  it('renders hero section with an aria-label attribute', () => {
    // The <section> element carries aria-label="Hero — explore group adventure trips"
    const section = document.querySelector('[aria-label]')
    expect(section).toBeInTheDocument()
    expect(section!.tagName.toLowerCase()).toBe('section')
  })

  // ── 2. Search form role ───────────────────────────────────────────────────

  it('renders the search form with role="search"', () => {
    expect(screen.getByRole('search')).toBeInTheDocument()
  })

  // ── 3. Search Trips button ────────────────────────────────────────────────

  it('renders the Search Trips button (mobile submit)', () => {
    // The mobile layout contains a <button type="submit">… Search Trips</button>.
    // JSDOM renders both mobile and desktop variants; aria-hidden on the icon
    // means the accessible name is purely "Search Trips".
    expect(
      screen.getByRole('button', { name: /search trips/i })
    ).toBeInTheDocument()
  })

  // ── 4. Slide indicator dots ───────────────────────────────────────────────

  it('renders four slide indicator buttons with aria-labels', () => {
    const dots = screen.getAllByRole('button', { name: /slide \d/i })
    expect(dots).toHaveLength(4)
    dots.forEach((dot, idx) => {
      expect(dot).toHaveAttribute('aria-label', `Slide ${idx + 1}`)
    })
  })

  // ── 5. Popular section label ──────────────────────────────────────────────

  it('renders "Popular:" label in the DOM', () => {
    // The span is visually hidden on mobile via Tailwind ("hidden sm:block") but
    // is always present in the DOM for AT users.
    expect(screen.getByText('Popular:')).toBeInTheDocument()
  })

  // ── 6. Quick pill buttons ─────────────────────────────────────────────────

  it('renders five quick-search pills with aria-label "Search trips to …"', () => {
    const pills = screen.getAllByRole('button', { name: /search trips to/i })
    expect(pills).toHaveLength(5)
  })

  // ── 7. Clicking a pill calls router.push ─────────────────────────────────

  it('popular pill click calls router.push', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })

    // "🏔️ Spiti Valley" maps to category "domestic"
    const spitiPill = screen.getByRole('button', {
      name: /search trips to spiti valley/i,
    })
    await user.click(spitiPill)

    expect(mockPush).toHaveBeenCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining('/destinations/')
    )
  })

  // ── 8. Submit button type ─────────────────────────────────────────────────

  it('Search Trips submit button has type="submit"', () => {
    const submitBtn = screen.getByRole('button', { name: /search trips/i })
    expect(submitBtn).toHaveAttribute('type', 'submit')
  })
})
