import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

const root = resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'backend-models': resolve(root, '../../backend/src/models'),
      '@components': resolve(root, 'common/components'),
      '@data': resolve(root, 'common/data'),
      '@models': resolve(root, 'common/models'),
      '@services': resolve(root, 'common/services'),
      '@store': resolve(root, 'common/store'),
      '@helpers': resolve(root, 'helpers'),
      '@features': resolve(root, 'features'),
      '@routing': resolve(root, 'routing'),
      '@pages': resolve(root, 'pages'),
    }
  },
  server: {
    port: 3000
  }
})
