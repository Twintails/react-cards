import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'public/build',
    rollupOptions: {
      input: {
        app: path.resolve(__dirname, 'src/client/client.jsx')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true
      }
    }
  },
  resolve: {
    alias: {
      shared: path.resolve(__dirname, 'src/server/shared')
    },
    extensions: ['.js', '.jsx']
  },
  define: {
    IS_PRODUCTION: JSON.stringify(process.env.NODE_ENV === 'production'),
    IS_DEVELOPMENT: JSON.stringify(process.env.NODE_ENV !== 'production'),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  },
  // CSS handled by styled-components - no preprocessor needed
})
