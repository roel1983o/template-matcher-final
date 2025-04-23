import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  root: '.',
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'index.html')
    },
    outDir: 'dist'
  }
});
