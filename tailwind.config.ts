import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        sage: {
          50: '#f7f9f7',
          100: '#e8f0e8',
          200: '#d1e1d1',
          300: '#a8c9a8',
          400: '#7aad7a',
          500: '#5a9259',
          600: '#457643',
          700: '#375e36',
          800: '#2f4c2e',
          900: '#283f27',
        },
        peach: {
          50: '#fef6f3',
          100: '#fdeee8',
          200: '#fbd9cd',
          300: '#f8bea8',
          400: '#f49775',
          500: '#ed7249',
          600: '#da5530',
          700: '#b64426',
          800: '#943a24',
          900: '#7a3423',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdfbf7',
          200: '#fbf6ed',
          300: '#f7eed9',
          400: '#f0ddb8',
          500: '#e5c591',
          600: '#d4a574',
          700: '#b88655',
          800: '#936b49',
          900: '#76593e',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;

