/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,astro}",
    "./client/**/*.{js,jsx,ts,tsx,astro}",
  ],
  theme: {
    extend: {
      colors: {
        tripadvisor: "#35E0A1",
        bubbles: "#00AA6C",
        podcast: "#004F32",
      },
      fontFamily: {
        "pt-sans": ['"PT Sans"', "sans-serif"],
        "trip-sans-regular": ["TripSansRegular", "sans-serif"],
        "trip-sans-medium": ["TripSansMedium", "sans-serif"],
        "trip-sans-bold": ["TripSansBold", "sans-serif"],
        "trip-sans-ultra": ["TripSansUltra", "sans-serif"],
        "trip-sans-mono": ["TripSansMono", "monospace"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
