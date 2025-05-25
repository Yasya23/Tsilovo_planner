import nextPlugin from '@next/eslint-plugin-next';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error: No types available for this plugin
import importPlugin from 'eslint-plugin-import';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error: No types available for this plugin
import prettierPlugin from 'eslint-plugin-prettier';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error: No types available for this plugin
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/*', '.next/*', 'build/*', 'next.config.ts'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
      '@next/next': nextPlugin,
    },
    rules: {
      quotes: ['error', 'single'],
      'max-len': ['error', { code: 120 }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import/order': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {},
      },
    },
  },
];
