/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      backgroundImage: {
        hero: "url('./src/images/hero.jpg')",
      },
    },
    fontFamily: {
      pfont: ["Oxygen", " sans-serif"],
      sfont: ["Poppins", "sans-serif"],
    },
  },

  plugins: [],
};
