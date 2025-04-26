import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/MARKDOWN-AI-QUIZ/',
  resolve: {
    alias: {
      '#minpath': path.resolve(__dirname, './node_modules/vfile/lib/minpath.js'),
      '#minproc': path.resolve(__dirname, './node_modules/vfile/lib/minproc.js'),
      '#minurl': path.resolve(__dirname, './node_modules/vfile/lib/minurl.js')
    }
  },
  build: {
    rollupOptions: {
      external: ['#minpath', '#minproc', '#minurl'],
      output: {
        paths: {
          '#minpath': '/MARKDOWN-AI-QUIZ/assets/minpath.js',
          '#minproc': '/MARKDOWN-AI-QUIZ/assets/minproc.js',
          '#minurl': '/MARKDOWN-AI-QUIZ/assets/minurl.js'
        }
      }
    }
  }
});