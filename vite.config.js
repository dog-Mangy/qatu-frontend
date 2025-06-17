import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  /*server: {
    allowedHosts: [
      'verde-dev.devops.jala.university',
      'localhost',
      'verde.devops.jala.university',
    ]
  },*/
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{js,ts,svelte}'],
      exclude: ['node_modules/**', 'dist/**', 'src/lib/server/**'],
    },
  },
  resolve: {
    conditions: ['browser'],
  },
});
