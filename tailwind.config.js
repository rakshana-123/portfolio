/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          green: '#39FF14',
          cyan: '#00F0FF',
          purple: '#BF40BF',
          pink: '#FF00FF',
        },
        dark: {
          900: '#0A0A0F',
          800: '#0E0E18',
          700: '#141422',
          600: '#1A1A2E',
          500: '#2A2A3E',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        orbit: ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
