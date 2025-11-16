// eslint.config.js
// Flat config for ESLint 9, using CommonJS so Node can load it without drama.

/** @type {import("eslint").Linter.FlatConfig[]} */
const js = require("@eslint/js");

module.exports = [
  {
    // Start from ESLint's recommended rules
    ...js.configs.recommended,
    files: ["client/**/*.js", "scripts/**/*.js"],
    languageOptions: {
      globals: {
        // Browser globals
        document: "readonly",
        window: "readonly",
        fetch: "readonly",
        // Common JS / Node globals used in scripts
        console: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly"
      }
    },
    ignores: ["dist/**", "node_modules/**"]
  }
];