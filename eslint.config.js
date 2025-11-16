const js = require("@eslint/js");

const baseConfig = js.configs.recommended;

module.exports = [
  baseConfig,
  {
    files: ["client/**/*.js", "scripts/**/*.js"],
    ignores: [
      "dist/**",
      "node_modules/**",
      "scripts/validate-schema.js"
    ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "script",
      globals: {
        // Browser-side globals
        window: "readonly",
        document: "readonly",
        console: "readonly",

        // Node-side globals for scripts
        process: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        __filename: "readonly"
      }
    },
    rules: {
      "no-console": "off"
    }
  }
];