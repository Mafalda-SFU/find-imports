import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import autoExternal from 'rollup-plugin-auto-external';

const plugins = [
  autoExternal(),
  // Allow json resolution
  json(),
  // Allow node_modules resolution, so you can use 'external' to control
  // which external modules to include in the bundle
  nodeResolve({ preferBuiltins: true, browser: false }),
  // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
  commonjs(),
  // Compile TypeScript files
  typescript({tsconfigOverride:{
    "compilerOptions":{
      "rootDir": "src",
      "declaration": true,
    },
    exclude:['tests','rollup.config.mjs']
  }}),
  // Resolve source maps to the original source
  // sourceMaps(),
]

export default [
  {
    input: `src/index.ts`,
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: false,
      },
      { file: "dist/index.mjs", format: "es", sourcemap: false },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    watch: {
      include: "src/**",
    },
    plugins ,
  }
];
