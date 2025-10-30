/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Paleta neutra entre claro e escuro
        bg: "#1E1E2E",       // fundo geral
        panel: "#2A2A3C",    // cartões / containers
        border: "#3C3C4F",   // bordas sutis
        text: "#E5E5E5",     // texto principal
        muted: "#A0A0B0",    // texto secundário
        accent: "#4C8BF5",   // botões / links
      },
    },
  },
  plugins: [],
};
