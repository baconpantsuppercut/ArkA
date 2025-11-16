module.exports = {
  env: {
    browser: true, // document, window, fetch, etc.
    node: true,    // require, __dirname, process, console, etc.
    es2021: true
  },
  extends: ["eslint:recommended"],
  ignorePatterns: ["dist/**", "node_modules/**"],
  rules: {
    "no-console": "off"
  }
};