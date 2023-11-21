/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    minWidth: {
      500: "325px",
    },
    extend: {
      maxWidth: {
        "7xl": "77rem",
        "8xl": "96rem",
        "9xl": "106rem",
      },
      width: {
        '60': '60px',
        '80': '80px',
        '120': '120px',
        '180': '180px',
        '230': '230px',
        '250': '250px',
        '260': '260px',
        '270': '270px',
        '280': '280px',
        '290': '290px',
        '300': '300px'
      },
      height: {
        '25': '25px',
        '35': '35px',
        '50': '50px',
        '120': '120px',
        '180': '180px',
        '250': '250px',
        '270': '270px',
        '280': '280px',
        '290': '290px',
        '300': '300px',
        '500': '500px',
        '620': '620px',
        '700': '700px'

      },
    },
  },
  plugins: [],
};