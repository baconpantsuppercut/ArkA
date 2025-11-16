import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

/**
 * Rollup config for the reference arkA client.
 *
 * Input:  client/js/main.js
 * Output: dist/bundle.js (IIFE for simple <script> usage)
 */
export default {
  input: "client/js/main.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    sourcemap: true,
    name: "arkaClient"
  },
  plugins: [
    resolve({
      browser: true
    }),
    commonjs()
  ]
};