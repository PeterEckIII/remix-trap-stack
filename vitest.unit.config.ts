import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    setupFiles: ["./tests/setup.unit.ts"],
    include: ["./tests/unit/**/*.test.ts"],
  },
});
