import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: './client',

  build: {
    outDir: '../dist',     // <--- dist volta pra raiz
    emptyOutDir: true,     // limpa a pasta dist antes
  },

  server: {
    host: true,
    allowedHosts: true,
    port: 5173,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
    },
  },
});
