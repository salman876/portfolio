import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: 'src',
    exclude: [...configDefaults.exclude],
    environment: 'jsdom', // needed for localStorage
  },
});
