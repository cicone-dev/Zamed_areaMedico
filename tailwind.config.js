import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#12a084", // fundo/logo principal
          dark: "#123D30",    // texto/logo escuro
        },
      },
    },
  },
  plugins: [
    [daisyui],
  ],
}
