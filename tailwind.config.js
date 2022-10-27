/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: [
        "Abel",
        "Helvetica",
        "Arial",
        "sans-serif",
        "ui-sans-serif",
        "system-ui",
      ],
    },
    extend: {
      gridTemplateRows: {
        // Complex site-specific row configuration
        layout: "4rem 1fr 3rem",
      },
      height: {
        // Complex site-specific row configuration
        image: "416px",
        imagelg: "521px",
      },
      minWidth: {
        // Complex site-specific row configuration
        image: "416px",
        imagelg: "288px",
      },
    },
  },
  plugins: [],
};
