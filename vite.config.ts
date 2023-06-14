import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://wakafalhambra.xyz",
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
})
