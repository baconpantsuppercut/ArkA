import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["dist/**"],

    rules: {
      // safe minimal ruleset for early project phase
      "no-unused-vars": "warn",
      "no-undef": "off"
    }
  }
];