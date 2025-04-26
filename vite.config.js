import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import path from 'path';

export default defineConfig({
  base: '/MARKDOWN-AI-QUIZ/',
  plugins: [
    react(),
    nodeResolve({
      moduleDirectories: ['node_modules']
    }),
    alias({
      entries: [
        { 
          find: '#minpath', 
          replacement: path.resolve(__dirname, 'node_modules/vfile/lib/minpath.js') 
        },
        { 
          find: '#minproc', 
          replacement: path.resolve(__dirname, 'node_modules/vfile/lib/minproc.js') 
        },
        { 
          find: '#minurl', 
          replacement: path.resolve(__dirname, 'node_modules/vfile/lib/minurl.js') 
        }
      ]
    })
  ],
  optimizeDeps: {
    include: [
      'vfile/lib/minpath.js',
      'vfile/lib/minproc.js',
      'vfile/lib/minurl.js'
    ]
  },
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      external: ['#minpath', '#minproc', '#minurl'] // 确保 Rollup 不尝试打包这些内部模块
    }
  }
});