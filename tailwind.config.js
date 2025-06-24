/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        lexend: ['Lexend', 'Lexend Fallback', 'sans-serif'],
      },
      fontSize: {
        heading: ['3.125rem'], // 50px
        subHeading: ['1.7rem'], // 20px
        Para: ['1.2rem'] // 30px
      },
      colors: {
        green: '#20b024',
        white: "#FFFFFF",
        yellow: "#FFDD02",
        black: "#000000",
        bodyColor : "#0d0d0d"
      },
    },
  },
  plugins: [],
}
