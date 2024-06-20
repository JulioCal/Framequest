import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base:'https://pagoya.shop/appsumo-integration/',
// https://vitejs.dev/config/
export default defineConfig({
  base:'https://pagoya.shop/appsumo-integration/',
  plugins: [react()],
  server: {
      proxy: {
        '/api': {
          target: 'https://my.ecwid.com/resellerapi/v1/register?register=y',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
})
