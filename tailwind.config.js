/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme:

    {
      screens: {
        'mobile': '320px',
        // => @media (min-width: 390px) { ... }

        'tablet': '890px',
        // => @media (min-width: 890px) { ... }

        'desktop': '1141px',
        // => @media (min-width: 1141px) { ... }

      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.17rem',
        '2xl': '1.5rem',
        '3xl': '1.953rem',
        '5xl': '3.34rem',
      },
      extend: {},
    },
  plugins: [],
};
