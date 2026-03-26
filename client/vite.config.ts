import { defineConfig, loadEnv, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const keyPath = path.resolve(__dirname, env.VITE_SSL_KEY_NAME);
  const certPath = path.resolve(__dirname, env.VITE_SSL_CERT_NAME);


  return {
    plugins: [react()] as PluginOption[],

    server: {
      host: '0.0.0.0',
      port: 5173,
      https: {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      },
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
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
