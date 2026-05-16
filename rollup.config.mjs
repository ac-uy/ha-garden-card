import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/ha-garden-card.ts",
  output: {
    file: "dist/ha-garden-card.js",
    format: "es",
    sourcemap: false,
  },
  plugins: [
    resolve(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: false,
      declarationDir: undefined,
      sourceMap: false,
    }),
    terser({
      format: {
        comments: false,
      },
    }),
  ],
};
