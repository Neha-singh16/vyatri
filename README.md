# Vyatri — Premium Travel & Trekking Platform

A high-performance travel and trekking website built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Designed for adventure travel agencies to showcase trips, destinations, and handle customer inquiries.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Features

- **Static Site Generation** — All 33 pages pre-rendered at build time for blazing-fast loads
- **Responsive Design** — Mobile-first layout with custom `xs` (475px) breakpoint
- **Self-Hosted Fonts** — Poppins + Syne via `next/font/google` (zero render-blocking requests)
- **Dynamic Imports** — Below-fold homepage components lazy-loaded for faster initial paint
- **Inquiry System** — Multi-step form with Zod validation, react-hook-form, and WhatsApp integration
- **Exit-Intent Popup** — Captures leaving visitors with accessible modal (ARIA, focus trap, Escape key)
- **Scroll Progress Bar** — Visual reading indicator on all pages
- **FAQ Accordion** — Radix UI–based accessible accordion
- **SEO Optimized** — Per-page metadata, Open Graph tags, structured headings
- **Accessibility** — ARIA attributes, focus management, keyboard navigation, `prefers-reduced-motion` support

## Tech Stack

| Layer         | Technology                                    |
| ------------- | --------------------------------------------- |
| Framework     | Next.js 14 (App Router)                       |
| Language      | TypeScript 5                                  |
| Styling       | Tailwind CSS 3.4                              |
| Forms         | react-hook-form + Zod + @hookform/resolvers   |
| Animation     | Framer Motion 11                              |
| Icons         | Lucide React                                  |
| Carousel      | Embla Carousel                                |
| UI Primitives | Radix UI (Accordion, Dialog)                  |
| Testing       | Jest + React Testing Library                  |

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm**, **yarn**, or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/vyatri.git
cd vyatri

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in your browser.

### Scripts

| Command            | Description                         |
| ------------------ | ----------------------------------- |
| `npm run dev`      | Start development server            |
| `npm run build`    | Create optimized production build   |
| `npm run start`    | Serve production build locally      |
| `npm run lint`     | Run ESLint                          |
| `npm run test`     | Run Jest test suite                 |
| `npm run test:ci`  | Run tests in CI mode                |

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (fonts, metadata, viewport)
│   ├── page.tsx            # Homepage
│   ├── about/              # About page
│   ├── blogs/              # Blog listing + [slug] detail
│   ├── contact/            # Contact page
│   ├── destinations/       # Destination categories
│   ├── faq/                # FAQ page
│   ├── trips/              # Trip detail pages
│   ├── privacy-policy/     # Privacy policy
│   ├── terms/              # Terms & conditions
│   └── api/enquiry/        # Inquiry API route (POST)
├── components/
│   ├── home/               # Homepage sections
│   ├── layout/             # Navbar, Footer
│   ├── shared/             # Reusable UI (InquiryModal, WhatsAppButton, etc.)
│   └── trips/              # Trip-specific components
├── data/                   # Static JSON data (trips, blogs)
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities, types, constants
├── public/                 # Static assets
└── __tests__/              # Jest test files
```

## Deployment

### Vercel (Recommended)

1. Push your repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — click **Deploy**
4. Your site is live with automatic CI/CD on every push

### Netlify

1. Push your repo to GitHub
2. Connect at [app.netlify.com](https://app.netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Deploy

### Self-Hosted

```bash
npm run build
npm run start    # Starts on port 3000
```

## Environment Variables

No environment variables are required for the base application. If you connect a real email/CRM backend for the inquiry form, add:

```env
# .env.local (example)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
```

## Design Tokens

| Token       | Value       | Usage               |
| ----------- | ----------- | -------------------- |
| Primary     | `#1a3875`   | Headers, nav, CTA    |
| Accent      | `#ff6b1a`   | Buttons, highlights  |
| Green       | `#00c87a`   | Success, badges      |
| Dark        | `#0d1b2a`   | Footer, dark sections|
| Body Font   | Poppins     | All body text        |
| Display Font| Syne        | Headings, hero       |

## License

This project is licensed under the MIT License.
