import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 4321,
    allowedHosts: true
  },
  preview: {
    host: '0.0.0.0',
    port: 4321,
    allowedHosts: true
  }
})