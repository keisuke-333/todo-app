/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  trailingComma: "all",
  tabWidth: 2,
  semi: false,
  singleQuote: false,
  jsxSingleQuote: false,
  printWidth: 100,
};

module.exports = config;
