/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // EcoSprint sustainability palette.
        //
        // `forest` is the brand GREEN accent (inspired by the EcoSprint tree
        // logo). It drives active navigation, selected tabs, links, small
        // icons, progress and green controls while staying natural & muted.
        //
        // `charcoal` is the green-tinted neutral ramp — it serves as both the
        // near-black ink for light-mode text and the deep "forest-night"
        // surfaces for dark mode. It is NOT bright; the green is a restrained
        // undertone so contrast levels match the previous greys.
        //
        // `sand` is the pale sage light-mode background/surface ramp.
        //
        // Light feel: warm off-white + very subtle sage tint.
        // Dark feel: deep green-black ("#07110B"-style) + dark forest surfaces.
        forest: {
          50: '#f2f7f0',
          100: '#e3efde',
          200: '#c8dfc0',
          300: '#a3c998',
          400: '#7bae6f',
          500: '#5c9147',
          600: '#4a7b3a',
          700: '#3c632f',
          800: '#2e4d25',
          900: '#203718',
          950: '#142310',
        },
        sage: {
          50: '#edf4e8',
          100: '#dcead3',
          200: '#c3dbb6',
          300: '#a4c793',
          400: '#83ab72',
          500: '#668d57',
          600: '#4d703f',
          700: '#3c5831',
          800: '#2f4427',
          900: '#263720',
        },
        sand: {
          50: '#f4f8f2',
          100: '#edf3e8',
          200: '#e4ede0',
          300: '#d6e2cc',
          400: '#bacaa8',
          500: '#9cb58d',
        },
        charcoal: {
          50: '#eef4ea',
          100: '#e3ecdd',
          200: '#d4e0cc',
          300: '#b9cdb0',
          400: '#96aa8d',
          500: '#6e8465',
          600: '#4c6045',
          700: '#3a4c36',
          800: '#1c3323',
          900: '#142619',
          950: '#0a130d',
        },
      },
      fontFamily: {
        sans: [
          '"Anthropic Sans"',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Arial',
          'sans-serif',
        ],
        mono: [
          '"Anthropic Mono"',
          '"SF Mono"',
          'ui-monospace',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      letterSpacing: {
        'tight-institutional': '-0.01em',
        'body': '-0.24px',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(20, 20, 19, 0.04)',
        'card': 'rgba(20, 20, 19, 0.015) 0px 2px 2px 0px, rgba(20, 20, 19, 0.03) 0px 4px 4px 0px, rgba(20, 20, 19, 0.05) 0px 16px 24px 0px',
        'card-hover': 'rgba(20, 20, 19, 0.02) 0px 2px 2px 0px, rgba(20, 20, 19, 0.04) 0px 6px 6px 0px, rgba(20, 20, 19, 0.07) 0px 20px 32px 0px',
        'dropdown': 'rgba(20, 20, 19, 0.05) 0px 4px 8px 0px, rgba(20, 20, 19, 0.06) 0px 12px 24px 0px',
        'modal': 'rgba(20, 20, 19, 0.08) 0px 8px 16px 0px, rgba(20, 20, 19, 0.1) 0px 24px 48px 0px',
      },
      borderRadius: {
        'xs': '0.25rem',
        'sm': '0.375rem',
        'DEFAULT': '0.5rem',
        'md': '0.625rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.375rem',
        '3xl': '1.75rem',
      },
      transitionTimingFunction: {
        'spec': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'fade-up': 'fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}