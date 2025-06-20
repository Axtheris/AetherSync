/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
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
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -4px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px -4px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'card': '16px',
        'button': '12px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      }
    },
  },
  plugins: [],
} 