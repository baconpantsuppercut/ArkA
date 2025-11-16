module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "script"
  },
  ignorePatterns: ["dist/", "node_modules/"],
  rules: {
    // We log in scripts and client – that's fine for this project.
    "no-console": "off",
    "no-process-exit": "off"
  },
  overrides: [
    {
      files: ["scripts/**/*.js"],
      env: {
        node: true,
        browser: false
      }
    }
  ]
};