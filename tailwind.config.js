/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta base AtomPop (se refinará)
        brand: {
          dark: '#0f172a', // Slate 900
          primary: '#f59e0b', // Amber 500 (Neón)
          secondary: '#06b6d4', // Cyan 500
          accent: '#ef4444', // Red 500
          success: '#84cc16', // Lime 500
        }
      },
      fontFamily: {
        sans: ['"Varela Round"', 'sans-serif'], // Fuente redondeada amigable
      }
    },
  },
  plugins: [],
}

