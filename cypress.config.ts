import react from '@vitejs/plugin-react';
import { defineConfig } from 'cypress';
import { defineConfig as defineViteConfig } from 'vite';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      on('dev-server:start', options => {
        const viteConfig = defineViteConfig({
          plugins: [react()],
        });
        return require('@cypress/vite-dev-server')({
          options,
          viteConfig,
        });
      });
    },
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
