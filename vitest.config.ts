import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    exclude: [
      'vitest.setup.ts',
      'vitest.config.ts',
      'tsconfig.*.json',
      'postcss.config.*',
      'commitlint.config.*',
      'eslint.config.*',
      'next.config.*',
      'tailwind.config.*',
      '**/*.d.ts',
      '**/types.ts',
    ],
    testTimeout: 5000,
    coverage: {
      reporter: ['text', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': './src',
    },
  },
});
