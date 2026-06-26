import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // Standard React Vite development local port
    proxy: {
      // Catches any local frontend route starting with /api and maps it to Express
      '/api': {
        target: 'http://localhost:3000', // Redirects requests directly to backend port
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
