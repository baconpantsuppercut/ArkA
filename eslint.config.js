import js from "@eslint/js";

export default [
  {
    ...js.configs.recommended,
    files: ["client/**/*.js", "scripts/**/*.js"],
    ignores: ["dist/**", "node_modules/**"]
  }
];