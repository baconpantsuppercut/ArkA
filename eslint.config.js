import js from "@eslint/js";

export default [
  // Global settings for browser JS (client)
  {
    files: ["client/**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        document: "readonly",
        console: "readonly",
        fetch: "readonly",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // Node scripts override (fixes __dirname error)
  {
    files: ["scripts/**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",   // <-- THIS FIXES YOUR ERROR
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  }
];