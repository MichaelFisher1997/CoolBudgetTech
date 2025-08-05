// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [
    react(),
    tailwind(),
  ],
  server: {
    host: '0.0.0.0',
    port: 4321
  },
  vite: {
    server: {
      host: '0.0.0.0',
      port: 4321,
      allowedHosts: true
    }
  }
});