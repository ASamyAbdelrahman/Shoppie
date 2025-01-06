/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      extend: {},
      screens: {
        xsm: { max: "600px" },
      },
    },
  },
  plugins: [],
};
