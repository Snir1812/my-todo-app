import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isTest = !!process.env.VITEST;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Provide a test-only alias for static assets so Vitest doesn't attempt
  // to load them as file:// URLs (which fails in jsdom environment).
  resolve: {
    alias: isTest
      ? [
          // Redirect common static asset imports to a tiny mock module
          {
            find: /\.(svg|png|jpe?g|gif|webp|avif)$/,
            replacement: path.resolve(__dirname, "src/__mocks__/fileMock.js"),
          },
          // Some code imports `/vite.svg` directly; ensure that's also handled
          {
            find: "/vite.svg",
            replacement: path.resolve(__dirname, "src/__mocks__/fileMock.js"),
          },
        ]
      : [],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests.js",
    include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
  },
});
