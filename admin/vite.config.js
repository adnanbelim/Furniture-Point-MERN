import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 5174 },
  proxy: {
    '/api': process.env.VITE_BACKEND_URL || 'http://localhost:9000', // Use the env variable, fallback to default if undefined
  },
})
