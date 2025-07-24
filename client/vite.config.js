import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Bu satırı ekleyin
    allowedHosts: 'all', // Tüm hostlara izin verin
  }
})
