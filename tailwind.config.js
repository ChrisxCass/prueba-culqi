/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{html,js,vue}',
  ],
  theme: {
    extend: {
      lineHeight: {
        '12': '4rem',
      }
    },

  },
  plugins: [],
}

