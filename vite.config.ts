import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        strictPort: false,
        allowedHosts: [
          '3000-igxfm3kcmpu4yd7gmoe4t-5550151e.manus-asia.computer',
          'localhost',
          '127.0.0.1'
        ],
        hmr: {
          clientPort: 3000,
        },
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      publicDir: 'assets',
      build: {
        assetsInlineLimit: 0,
        rollupOptions: {
          output: {
            assetFileNames: 'assets/[name]-[hash][extname]'
          }
        }
      }
    };
});
