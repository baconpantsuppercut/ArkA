// Minimal Rollup config for arkA reference client.
// Goal: make `npm run build` succeed in CI and give contributors
// a simple, understandable build target.

import { defineConfig } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  input: "client/main.js",     // entry point (already in the repo)
  output: {
    dir: "dist",               // output folder
    format: "esm",             // modern browsers
    sourcemap: true
  },
  plugins: [
    nodeResolve(),
    commonjs()
  ]
});