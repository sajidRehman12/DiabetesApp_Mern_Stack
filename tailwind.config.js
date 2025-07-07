/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // This is where you can add your custom colors, fonts, spacing, etc.
      // Example custom color:
      // colors: {
      //   'primary-blue': '#3490dc',
      // },
    },
  },
  plugins: [], 
};