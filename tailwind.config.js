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
        heading: {
          base: '1.5rem', // ~24px for small screens
          sm: '1.75rem',  // ~28px
          md: '2rem',     // ~32px
          lg: '2.125rem', // ~34px
          xl: '2.5rem',   // ~40px
        },
        subHeading: ['1.7rem'],
        subHeading2: ['1.6rem'],
        Para: ['1.2rem']
      },
      colors: {
        green: '#20b024',
        white: "#FFFFFF",
        yellow: "#FFDD02",
        black: "#000000",
        bodyColor : "#0d0d0d",
        grey : "#9d9d9d"
      },
    },
  },
  plugins: [],
}
