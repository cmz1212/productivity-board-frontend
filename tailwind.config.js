/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    minWidth: {
      500: "325px",
    },
    extend: {
      colors: {
        notFound: "#F2949C",
      },
      maxWidth: {
        "8xl": "96rem",
      },
    },
  },
  plugins: [],
};
