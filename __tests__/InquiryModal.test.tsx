/**
 * @file InquiryModal.test.tsx
 * Tests for components/shared/InquiryModal.tsx
 */

import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// ─── Module mocks ─────────────────────────────────────────────────────────────

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
})

// ─── Component under test ─────────────────────────────────────────────────────

import InquiryModal from '@/components/shared/InquiryModal'

// ─── Common setup ─────────────────────────────────────────────────────────────

beforeEach(() => {
  window.scrollTo = jest.fn()
  global.fetch = jest.fn()
  // Use fake timers so the internal 600 ms and 3500 ms setTimeouts
  // never fire unexpectedly during assertions.
  jest.useFakeTimers()
})

afterEach(() => {
  // Drain any pending timers to avoid React "act" warnings between tests.
  act(() => {
    jest.runOnlyPendingTimers()
  })
  jest.useRealTimers()
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * userEvent configured to advance Jest's fake clock automatically so that
 * internal delays inside userEvent (key-press timing etc.) are resolved.
 */
function setup() {
  return userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
}

async function fillValidForm(user: ReturnType<typeof setup>) {
  await user.type(screen.getByPlaceholderText('Your Full Name *'), 'John Doe')
  await user.type(screen.getByPlaceholderText('WhatsApp number *'), '9876543210')
  await user.type(screen.getByPlaceholderText('Email Address *'), 'john@example.com')
  await user.type(
    screen.getByPlaceholderText(/preferred dates, budget/i),
    'Hello world'
  )
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('InquiryModal', () => {
  // ── 1. Closed state ──────────────────────────────────────────────────────

  it('renders nothing when isOpen is false', () => {
    render(<InquiryModal isOpen={false} onClose={jest.fn()} />)
    // Component returns null when closed — no dialog in the DOM at all
    expect(document.body).not.toContainElement(
      document.body.querySelector('[role="dialog"]')
    )
  })

  // ── 2. Open state ────────────────────────────────────────────────────────

  it('renders dialog when isOpen is true', () => {
    render(<InquiryModal isOpen={true} onClose={jest.fn()} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  // ── 3. ARIA attributes ───────────────────────────────────────────────────

  it('has aria-modal="true" on the dialog element', () => {
    render(<InquiryModal isOpen={true} onClose={jest.fn()} />)
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
  })

  // ── 4. Validation — empty submit ─────────────────────────────────────────

  it('shows validation error for empty form submission', async () => {
    const user = setup()
    render(<InquiryModal isOpen={true} onClose={jest.fn()} />)

    await user.click(screen.getByRole('button', { name: /send enquiry/i }))

    await waitFor(() => {
      expect(screen.getByText('Enter your full name')).toBeInTheDocument()
    })
  })

  // ── 5. Validation — invalid email ────────────────────────────────────────

  it('shows validation error for invalid email', async () => {
    const user = setup()
    render(<InquiryModal isOpen={true} onClose={jest.fn()} />)

    await user.type(screen.getByPlaceholderText('Your Full Name *'), 'Jane')
    await user.type(screen.getByPlaceholderText('WhatsApp number *'), '9876543210')
    await user.type(screen.getByPlaceholderText('Email Address *'), 'not-an-email')
    await user.type(
      screen.getByPlaceholderText(/preferred dates, budget/i),
      'Hello world'
    )

    await user.click(screen.getByRole('button', { name: /send enquiry/i }))

    await waitFor(() => {
      expect(
        screen.getByText('Enter a valid email address')
      ).toBeInTheDocument()
    })
  })

  // ── 6. Escape key calls onClose ──────────────────────────────────────────

  it('Escape key calls onClose', () => {
    const onClose = jest.fn()
    render(<InquiryModal isOpen={true} onClose={onClose} />)

    act(() => {
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
    })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  // ── 7. Successful submission → success state ─────────────────────────────

  it('successful submission shows success state', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    })

    const user = setup()
    render(<InquiryModal isOpen={true} onClose={jest.fn()} />)

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: /send enquiry/i }))

    // Advance past the 600 ms artificial delay in onSubmit
    await act(async () => {
      jest.advanceTimersByTime(700)
    })

    await waitFor(() => {
      expect(screen.getByText(/thanks/i)).toBeInTheDocument()
    })
  })

  // ── 8. Network error → warning banner ────────────────────────────────────

  it('network error shows warning banner', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

    const user = setup()
    render(<InquiryModal isOpen={true} onClose={jest.fn()} />)

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: /send enquiry/i }))

    // The fetch rejection is handled via a microtask (no timer advancement
    // needed); setNetworkErr(true) fires before the 600 ms setTimeout, so
    // the error banner is visible before isSubmitSuccessful becomes true.
    await waitFor(() => {
      expect(
        screen.getByText(/couldn't reach our server/i)
      ).toBeInTheDocument()
    })
  })

  // ── 9. WhatsApp link href ────────────────────────────────────────────────

  it('WhatsApp link has correct href containing wa.me', () => {
    render(
      <InquiryModal isOpen={true} onClose={jest.fn()} tripTitle="Spiti" />
    )

    const waLink = screen.getByRole('link', { name: /chat on whatsapp/i })
    expect(waLink.getAttribute('href')).toContain('wa.me')
  })

  // ── 10. Close button calls onClose ───────────────────────────────────────

  it('close button calls onClose', async () => {
    const onClose = jest.fn()
    const user = setup()
    render(<InquiryModal isOpen={true} onClose={onClose} />)

    const closeBtn = screen.getByRole('button', { name: /close enquiry form/i })
    await user.click(closeBtn)

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
