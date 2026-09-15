/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  // in tailwind.config.js

  theme: {
    extend: {
      screens: {
        'portrait': {'raw': '(orientation: portrait)'}, // You define it here
        'landscape': {'raw': '(orientation: landscape)'}, // And here for landscape
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
        body: ['Inter', 'sans-serif'], 
        number: ['Inter', 'sans-serif'],
        display: ['Faculty Glyphic', 'sans-serif'],
        decorative: ['Dancing Script', 'cursive'] 
      },
    },
  },

  plugins: [],
}

