/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#3d3bf30f', 
          100: '#3d3bf31a', 
          200: '#3d3bf333', 
          300: '#3d3bf34d', 
          400: '#3d3bf380', 
          500: '#3d3bf3e6', 
          600: '#3d3bf3', 
          700: '#3d3bf3', 
          800: '#3d3bf3', 
          900: '#3d3bf3', 
          950: '#3d3bf3', 
          DEFAULT: '#3d3bf3'
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
