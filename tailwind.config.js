/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pdf-templates/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        spectral: ['var(--font-spectral)', 'serif'],
      },
      colors: {
        // Dynamic brand colors
        brand: {
          50: 'var(--color-brand-50)',
          100: 'var(--color-brand-100)',
          200: 'var(--color-brand-200)',
          300: 'var(--color-brand-300)',
          400: 'var(--color-brand-400)',
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
          800: 'var(--color-brand-800)',
          900: 'var(--color-brand-900)',
          950: 'var(--color-brand-950)',
          accent: 'var(--color-brand-accent)',
          'accent-text': 'var(--color-brand-accent-text)',
          'alternative-accent': 'var(--color-brand-alternative-accent)',
        },
        // Grayscale palette
        grayscale: {
          50: 'var(--color-grayscale-50)',
          100: 'var(--color-grayscale-100)',
          200: 'var(--color-grayscale-200)',
          300: 'var(--color-grayscale-300)',
          400: 'var(--color-grayscale-400)',
          500: 'var(--color-grayscale-500)',
          600: 'var(--color-grayscale-600)',
          700: 'var(--color-grayscale-700)',
          800: 'var(--color-grayscale-800)',
          900: 'var(--color-grayscale-900)',
          950: 'var(--color-grayscale-950)',
          body: 'var(--color-grayscale-body)',
        },
        // Semantic colors
        primary: {
          DEFAULT: 'var(--background-primary)',
          foreground: 'var(--foreground-primary)',
          subtle: {
            DEFAULT: 'var(--background-primary-subtle)',
            foreground: 'var(--foreground-primary-subtle)',
          },
          light: {
            DEFAULT: 'var(--background-primary-light)',
            foreground: 'var(--foreground-primary-light)',
          },
        },
        secondary: {
          DEFAULT: 'var(--background-secondary-1)',
          foreground: 'var(--foreground-secondary-1)',
        },
        accent: {
          DEFAULT: 'var(--background-accent)',
          foreground: 'var(--foreground-accent)',
          alternative: 'var(--alternative-accent)',
        },
        // Table specific colors
        table: {
          header: {
            bg: 'var(--table-header-bg)',
            text: 'var(--table-header-text)',
          },
          border: 'var(--table-border)',
          row: {
            even: 'var(--table-row-even)',
            odd: 'var(--table-row-odd)',
          },
        },
        // Border colors
        border: {
          DEFAULT: 'var(--border)',
          lighter: 'var(--border-lighter)',
          grayscale: {
            DEFAULT: 'var(--border-grayscale)',
            lighter: 'var(--border-grayscale-lighter)',
            darker: 'var(--border-grayscale-darker)',
          },
        },
        // Background and foreground colors
        background: {
          DEFAULT: 'var(--background)',
          accent: 'var(--background-accent)',
          grayscale: 'var(--background-grayscale)',
          'grayscale-subtle': 'var(--background-grayscale-subtle)',
          'grayscale-disabled': 'var(--background-grayscale-disabled)',
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          accent: 'var(--foreground-accent)',
          grayscale: 'var(--foreground-grayscale)',
          'grayscale-subtle': 'var(--foreground-grayscale-subtle)',
          'grayscale-disabled': 'var(--foreground-grayscale-disabled)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'brand-gradient': 'linear-gradient(to right, var(--gradient-start), var(--gradient-end))',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
    },
  },
  plugins: [],
}
