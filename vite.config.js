import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/MARKDOWN-AI-QUIZ/', // 添加這行
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      external: ['#minurl','#minpath','#minproc'], // 確保外部依賴
    },
  }
});