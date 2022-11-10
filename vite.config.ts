import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import macrosPlugin from 'vite-plugin-babel-macros';
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), macrosPlugin(), WindiCSS()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
