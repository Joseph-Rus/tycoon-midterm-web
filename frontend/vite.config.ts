import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // send /api calls to the Django server
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
