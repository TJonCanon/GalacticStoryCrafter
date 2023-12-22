/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./public/**/*.html",
    "./public/**/*.js",
    // Add other paths here
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background': "url('/images/space_background.png"
      }
    },
  },
  plugins: [],
}

