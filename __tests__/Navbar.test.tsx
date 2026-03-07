/**
 * @file Navbar.test.tsx
 * Tests for components/layout/Navbar.tsx
 */

import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// ─── Module mocks ─────────────────────────────────────────────────────────────

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: jest.fn() }),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    className,
    style,
  }: {
    src: string
    alt: string
    className?: string
    style?: React.CSSProperties
  }) => <img src={src} alt={alt} className={className} style={style} />,
}))

jest.mock('@/hooks/useFocusTrap', () => ({
  useFocusTrap: jest.fn(),
}))

jest.mock('@/components/shared/InquiryTrigger', () => ({
  __esModule: true,
  default: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => <button className={className}>{children}</button>,
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

import Navbar from '@/components/layout/Navbar'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getHamburger() {
  return screen.getByRole('button', { name: /open navigation menu/i })
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Navbar', () => {
  beforeEach(() => {
    render(<Navbar />)
  })

  it('renders the hamburger button', () => {
    // The button that opens the mobile nav must always be in the document
    expect(getHamburger()).toBeInTheDocument()
  })

  it('hamburger button has aria-expanded false initially', () => {
    expect(getHamburger()).toHaveAttribute('aria-expanded', 'false')
  })

  it('pressing hamburger opens mobile menu', async () => {
    const user = userEvent.setup()
    const hamburger = getHamburger()

    await user.click(hamburger)

    // aria-expanded on the hamburger toggles to true
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')

    // The mobile menu panel now carries the 'open' CSS class
    const panel = screen.getByRole('dialog', { hidden: false })
    expect(panel).toHaveClass('open')
  })

  it('mobile menu has correct ARIA attributes', async () => {
    const user = userEvent.setup()
    await user.click(getHamburger())

    // Panel attributes after it opens
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-label')
    expect(dialog.getAttribute('aria-label')?.toLowerCase()).toContain('menu')
  })

  it('pressing Escape closes mobile menu', async () => {
    const user = userEvent.setup()
    await user.click(getHamburger())

    // Confirm it is open
    expect(getHamburger()).toHaveAttribute('aria-expanded', 'true')

    // Fire a keydown on the document level (matches component's listener)
    act(() => {
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
    })

    expect(getHamburger()).toHaveAttribute('aria-expanded', 'false')
  })

  it('desktop Destinations button has aria-haspopup', () => {
    // The Destinations nav entry renders as a <button aria-haspopup="true">
    const destinationsBtn = screen.getByRole('button', {
      name: /destinations/i,
    })
    expect(destinationsBtn).toHaveAttribute('aria-haspopup', 'true')
  })

  it('navbar renders logo with Vyatri text', () => {
    // VYATRI appears both in the top bar logo and inside the mobile panel
    const instances = screen.getAllByText('VYATRI')
    expect(instances.length).toBeGreaterThanOrEqual(1)
  })

  it('Enquire Now button present in desktop nav', () => {
    // InquiryTrigger is mocked to a plain <button>{children}</button>.
    // The children passed in the desktop nav include the text "Enquire Now".
    const enquireBtns = screen.getAllByRole('button', { name: /enquire now/i })
    expect(enquireBtns.length).toBeGreaterThanOrEqual(1)
  })
})
