import { useEffect, RefObject } from 'react'

const FOCUSABLE = [
  'a[href]:not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  'input:not([disabled]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

/**
 * Traps keyboard focus inside `ref` while `active` is true.
 * Returns focus to `returnRef` (or the previously focused element) on deactivation.
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement>,
  active: boolean,
  returnRef?: RefObject<HTMLElement>
) {
  useEffect(() => {
    if (!active || !ref.current) return

    // Save element that had focus before the trap activated
    const previouslyFocused = (returnRef?.current ?? document.activeElement) as HTMLElement | null

    const container = ref.current
    const getFocusables = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        el => !el.closest('[inert]') && el.offsetParent !== null
      )

    // Move focus into the container
    const focusables = getFocusables()
    focusables[0]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const els = getFocusables()
      if (els.length === 0) { e.preventDefault(); return }

      const first = els[0]
      const last  = els[els.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    container.addEventListener('keydown', onKeyDown)
    return () => {
      container.removeEventListener('keydown', onKeyDown)
      // Restore focus when trap is released
      previouslyFocused?.focus?.()
    }
  }, [active, ref, returnRef])
}
