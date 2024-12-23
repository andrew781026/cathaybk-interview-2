import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Simulates the DOM
    globals: true, // Enables global APIs like `describe` and `it`
    // setupFiles: './vitest.setup.js', // Path to your setup file (optional)
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
