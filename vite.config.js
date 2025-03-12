import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://appsail-50025389578.development.catalystappsail.in',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
