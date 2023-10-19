/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme:
    { screens: {
        'mobile': '320px',
        // => @media (min-width: 390px) { ... }

        'tablet': '890px',
        // => @media (min-width: 890px) { ... }

        'desktop': '1141px',
        // => @media (min-width: 1141px) { ... }

    },
    extend: {},
  },
  plugins: [],
}
