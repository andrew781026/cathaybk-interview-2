import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';
import * as child from 'child_process';

// ref : https://stackoverflow.com/questions/70436753/how-to-add-commit-hash-into-reactjs-vite-config-js
const commitHash = child.execSync('git rev-parse HEAD').toString();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cathaybk-interview-2/',
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
