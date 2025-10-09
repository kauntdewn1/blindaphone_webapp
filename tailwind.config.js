module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bp-navy': '#042A40',
        'bp-navy-ink': '#031E30',
        'bp-navy-soft': '#0A3A52',
        'bp-navy-light': '#1A4A6B',
        'bp-navy-lighter': '#2A5A7C',
        'bp-gold': '#FFD100',
        'bp-gold-hover': '#FFCF33',
        'bp-gold-dark': '#E6B800',
        'bp-gold-light': '#FFE066',
        'bp-white': '#FFFFFF',
        'bp-gray': '#F8FAFC',
        'bp-gray-light': '#F1F5F9',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 209, 0, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 209, 0, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
