import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

const root = resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': resolve(root, 'common/components'),
      '@data': resolve(root, 'common/data'),
      '@models/*': resolve(root, 'common/models'),
    }
  },
  server: {
    port: 3000
  }
})
