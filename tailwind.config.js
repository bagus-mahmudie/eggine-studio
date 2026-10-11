const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{njk,html,md,js}"],
  theme: {
    extend: {
      colors: {
        limeEgg: "#FFF645",
        ink: "#0A0C19",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        soft: "0 10px 35px rgba(0,0,0,.45)",
        pill: "0 0 0 1px rgba(255,255,255,.10), 0 18px 45px rgba(0,0,0,.55)",
      },
      borderRadius: {
        "2xlplus": "1.25rem",
      },
    },
  },
  plugins: [],
};
