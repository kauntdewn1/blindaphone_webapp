/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blindaphone': {
          'black': '#001b42',
          'gray': '#1F1F1F',
          'yellow': '#FFD400',
          'white': '#F5F5F5',
          'blue': '#141C2A'
        }
      },
      fontFamily: {
        'primary': ['Montserrat', 'sans-serif'],
        'mono': ['Chivo Mono', 'monospace']
      }
    },
    corePlugins: {
      preflight: true
    }
  },
  plugins: [],
} 