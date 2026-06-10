/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blip: {
          50:  '#f0eeff',
          100: '#e2ddff',
          200: '#c8bfff',
          300: '#a592ff',
          400: '#7e5fff',
          500: '#5B2DE5',
          600: '#4918d4',
          700: '#3c10b8',
          800: '#320e96',
          900: '#1E1B4B',
        },
        teal: {
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
