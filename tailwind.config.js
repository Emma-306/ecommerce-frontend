/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./pages/**/*.html", "./js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        theme: "#DB4444",
        mygreen: "#00FF66"
      },
    },
  },
  plugins: [],
}