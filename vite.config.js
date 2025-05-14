import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import commonjs from '@rollup/plugin-commonjs'

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    commonjs({
      include: ['node_modules/firebase/**/*.js']
    })
  ],
  base: '/',
  resolve: {
    alias: {
      // Force CommonJS modules for Firebase
      'firebase/app': 'firebase/app/dist/index.cjs',
      'firebase/auth': 'firebase/auth/dist/index.cjs',
      'firebase/firestore': 'firebase/firestore/dist/index.cjs',
      'firebase/storage': 'firebase/storage/dist/index.cjs',
      'firebase': 'firebase/dist/index.cjs'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/firebase/, /@heroicons/]
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@headlessui/react', '@heroicons/react', 'framer-motion'],
          auth: ['@supabase/supabase-js', 'firebase']
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      '@heroicons/react/20/solid',
      '@heroicons/react/24/outline',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore'
    ],
    exclude: ['firebase']
  },
  server: {
    port: 3000,
    strictPort: true
  }
})