import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      'quotes': ['error', 'single']
    },
    settings: {
      react: { version: '19.2' },
    }
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'migrations/**',
    'src/prisma/**/*.d.ts',
    'next-env.d.ts',
  ]),
])

export default eslintConfig;
