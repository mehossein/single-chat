module.exports = {
  prefix: "",
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      screens: {
        xs: { max: "360px" },
      },
      fontSize: { "2xs": ".5rem" },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
