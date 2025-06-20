/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand colors from the design
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6ff',
          300: '#a5b8ff',
          400: '#8490ff',
          500: '#6366f1', // Main purple/blue
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        secondary: {
          50: '#f0fdff',
          100: '#ccfaff',
          200: '#99f4ff',
          300: '#66eeff', // Light blue
          400: '#33e8ff',
          500: '#00d4ff',
          600: '#00b8e6',
          700: '#009cc2',
          800: '#00809e',
          900: '#006680',
        },
        // Background gradient
        background: {
          from: '#e6f3ff',
          to: '#f0f8ff',
        },
        // Card and surface colors
        surface: {
          50: '#ffffff',
          100: '#f8fafc',
          200: '#f1f5f9',
          300: '#e2e8f0',
          400: '#cbd5e1',
          500: '#94a3b8',
        },
        // Status colors
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
        // Text colors
        text: {
          primary: '#1e293b',
          secondary: '#64748b',
          tertiary: '#94a3b8',
        },
        // Chart colors for analytics
        chart: {
          documents: '#3b82f6', // Blue
          sound: '#10b981',     // Green
          videos: '#8b5cf6',    // Purple
          photos: '#f59e0b',    // Orange
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -4px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px -4px rgba(0, 0, 0, 0.12)',
        'sidebar': '4px 0 20px -4px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'card': '16px',
        'button': '12px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
} 