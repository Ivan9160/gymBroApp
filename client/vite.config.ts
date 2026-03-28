import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()] as PluginOption[],

  server: {
    allowedHosts: [
      'gymbro-tracker.pp.ua'
    ],
    host: '127.0.0.1', 
    port: 5173,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});