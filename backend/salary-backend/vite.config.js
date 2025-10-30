// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,           // CỐ ĐỊNH CỔNG 5173
    strictPort: true,     // Không tự đổi cổng
  },
})