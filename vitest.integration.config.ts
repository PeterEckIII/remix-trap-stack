import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    poolOptions: {
      threads: {
        maxThreads: 1,
        minThreads: 1,
      },
    },
    setupFiles: ["./tests/setup.integration.ts"],
    include: ["./tests/integration/**/*.test.ts"],
  },
});
