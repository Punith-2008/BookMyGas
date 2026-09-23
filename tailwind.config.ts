import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        flame: {
          50: '#FFF5EE',
          100: '#FFE8D9',
          200: '#FFD0B0',
          400: '#FF8A4C',
          500: '#FF6B1A',
          600: '#E85A0C',
          700: '#C2470A',
        },
        cylinder: {
          red: '#D7261E',
          redDark: '#9E1812',
          blue: '#1F4FA3',
          blueDark: '#143670',
          silver: '#C9D1DB',
          brass: '#C9A227',
        },
        navy: {
          600: '#1E3A8A',
          700: '#172E5E',
          800: '#10264A',
          900: '#0B1F3A',
        },
        mint: { 100: '#D1FAE5', 500: '#10B981', 600: '#059669' },
        amber: { 100: '#FEF3C7', 400: '#FBBF24', 500: '#F59E0B' },
      },
      fontFamily: {
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 0 rgba(255,107,26,0.55)',
        card: '0 10px 30px -12px rgba(11,31,58,0.18)',
        sticker: '0 6px 14px -4px rgba(11,31,58,0.35)',
      },
      keyframes: {
        pulseGlow: {
          '0%': { boxShadow: '0 0 0 0 rgba(255,107,26,0.55)' },
          '70%': { boxShadow: '0 0 0 14px rgba(255,107,26,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(255,107,26,0)' },
        },
        flicker: {
          '0%,100%': { transform: 'scaleY(1) translateY(0)' },
          '50%': { transform: 'scaleY(1.08) translateY(-1px)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rise: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '20%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-120px) scale(0.4)', opacity: '0' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 2s infinite',
        flicker: 'flicker 1.2s ease-in-out infinite',
        floaty: 'floaty 5s ease-in-out infinite',
        rise: 'rise 4s ease-in infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
