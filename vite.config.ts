import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/shipstation': {
        target: 'https://ssapi.shipstation.com/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/shipstation/, ''),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
    },
  },
});