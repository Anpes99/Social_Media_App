module.exports = {
  mode: "jit",
  purge: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
