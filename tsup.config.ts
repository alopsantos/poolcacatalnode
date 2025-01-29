import { defineConfig } from "tsup";

export default defineConfig({
  tsconfig: "./tsconfig.json",
  splitting: false,
  sourcemap: true,
  clean: true
});
