import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const apiProxy = {
  '/imoveis': { target: 'http://localhost:8080', changeOrigin: true },
  '/usuario': { target: 'http://localhost:8080', changeOrigin: true },
} as const

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { ...apiProxy },
  },
  preview: {
    proxy: { ...apiProxy },
  },
})
