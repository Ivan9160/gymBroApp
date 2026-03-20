import { defineConfig, loadEnv, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
  plugins: [react(), basicSsl()] as PluginOption[],
    server: {
      https: {
        key: path.resolve(__dirname, '../localhost-key.pem'),
        cert: path.resolve(__dirname, '../localhost.pem'),
      },
      proxy: {
        '/api': {
          target: env.VITE_API_URL, 
          changeOrigin: true
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
