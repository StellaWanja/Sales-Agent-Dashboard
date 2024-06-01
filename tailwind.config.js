/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': {'min': '300px', 'max': '768px'}, // Custom breakpoint for up to 768px
      },
    },
  },
  plugins: [],
}