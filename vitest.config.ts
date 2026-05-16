import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.{test,property}.ts"],
    globals: true,
  },
});
