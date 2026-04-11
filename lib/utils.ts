import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function getDiscountPercent(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100)
}

export const WHATSAPP_NUMBER = '918700289516'
export const PHONE_NUMBER = '+918700289516'
export const PHONE_DISPLAY = '+91 87002 89516'

export function getWhatsAppLink(message: string = ''): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const BADGE_COLORS: Record<string, string> = {
  'Bestseller': 'bg-accent text-white',
  'Weekend': 'bg-green-500 text-white',
  'International': 'bg-primary text-white',
  'Hot Deal': 'bg-red-500 text-white',
  'Popular': 'bg-purple-600 text-white',
  'Spiritual': 'bg-yellow-500 text-dark',
  'Snow Trip': 'bg-blue-400 text-white',
  'Adventure': 'bg-orange-600 text-white',
  'Group Trip': 'bg-primary text-white',
}
