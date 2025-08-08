/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#1C2957",
          DEFAULT: "#1C2957", // your main brand color
          dark: "#1E3A8A",
        },
      },
      fontSize: {
        h1: ["1.5rem", { fontWeight: "700", letterSpacing: "0.02em" }],
        h2: ["1.25rem", { fontWeight: "600" }],
        h3: ["1.125rem", { fontWeight: "500" }],
        p: ["1rem", { fontWeight: "500" }],
        small:['0.8rem', { fontWeight: "500" }],
      },
    },
  },
  plugins: [],
};
