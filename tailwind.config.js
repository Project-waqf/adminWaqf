/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        screens: {
          sm: '675px',
          md: '768px',
          lg: '1003px',
          xl: '1440px',
      },
      colors: {
        primary: {
          100: "#22509B",
          90: "#3862A5",
          80: "#4E73AF",
          70: "#6485B9",
          60: "#7A96C3",
        },
        neutral: {
          60: "#D6D7DE",
          80: "#A5A6AC",
          90: "#828387",
        },
        text01: "#27303E",
        text02: "#606770",
        text03: "#969A9F",
        subText: "#3F4753",
        btnColor: "#F98D3E",
        whiteBg: "#FAFAFA",
        Green: "#10A016",
        disable: "#BB9171",
        error: {
          70: "#ED3D3D",
          80: "#EB2525",
          90: "#E90D0D"
        }
      },
    },
    fontFamily: {
      inter: ["sans-serif"],
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // <== disable this!
  },
};