import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.js"],
    coverage: {
      provider: "v8",
      all: true,
      reporter: ["text", "html", "json-summary"],
      include: ["src/**/*.js", "client/**/*.{js,jsx}"],
      exclude: [
        "src/server.js",
        "client/main.jsx",
        "**/*.config.js",
      ],
    },
  },
});
