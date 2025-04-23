import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  root: '.', // project root
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'index.html') // expliciet entry point
    },
    outDir: 'dist'
  }
})
