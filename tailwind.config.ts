import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: { xs:'475px', sm:'640px', md:'768px', lg:'1024px', xl:'1280px', '2xl':'1536px' },
    extend: {
      colors: {
        primary:  { DEFAULT:'#1a3875', light:'#2554cc', 50:'#EFF6FF', 100:'#DBEAFE', 500:'#3B82F6', 600:'#2563EB', 800:'#1E40AF', 900:'#1a3875' },
        accent:   { DEFAULT:'#ff6b1a', dark:'#ea5a0b',  50:'#FFF7ED', 100:'#FFEDD5', 300:'#FDBA74', 500:'#ff6b1a', 600:'#ea5a0b', 700:'#C2410C' },
        dark:     { DEFAULT:'#0d1b2a', card:'#1a2332' },
        green:    { DEFAULT:'#00c87a' },
      },
      fontFamily: {
        sans:    ['var(--font-poppins)','Poppins','-apple-system','BlinkMacSystemFont','sans-serif'],
        display: ['var(--font-syne)','Syne','Poppins','sans-serif'],
      },
      boxShadow: {
        card:      '0 4px 20px rgba(13,27,42,0.07)',
        'card-lg': '0 20px 60px rgba(13,27,42,0.16)',
        orange:    '0 8px 28px rgba(255,107,26,0.42)',
        green:     '0 8px 24px rgba(0,200,122,0.40)',
      },
      animation: {
        'fade-up':  'fadeUp .65s ease forwards',
        'fade-in':  'fadeIn .5s ease forwards',
        'pulse-slow':'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: { '0%':{opacity:'0',transform:'translateY(20px)'},'100%':{opacity:'1',transform:'translateY(0)'} },
        fadeIn: { '0%':{opacity:'0'},'100%':{opacity:'1'} },
      },
    },
  },
  plugins: [],
}
export default config
