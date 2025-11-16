/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  {
    files: ["**/*.js", "**/*.ts"],
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    rules: {
      // Keep this very light for now
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];