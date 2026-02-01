import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm, friendly color palette
        primary: {
          50: '#fef7ee',
          100: '#fdecd8',
          200: '#fad5b0',
          300: '#f6b77e',
          400: '#f19149',
          500: '#ed7424',
          600: '#de5a1a',
          700: '#b84418',
          800: '#93381b',
          900: '#773019',
        },
        warm: {
          50: '#fdf8f6',
          100: '#f8ede8',
          200: '#f2ddd4',
          300: '#e8c4b4',
          400: '#dba38c',
          500: '#cc8369',
          600: '#b86b52',
          700: '#9a5542',
          800: '#7f4839',
          900: '#693f33',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
