import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...svelte.configs.recommended,
  prettierConfig,
  {
    plugins: {
      prettier,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['src/**/*.svelte', 'src/**/*.js'],
    languageOptions: {
      parserOptions: {},
    },
  },
  {
    rules: {
      'prettier/prettier': 'error',
      'svelte/no-at-html-tags': 'error',
      'svelte/valid-compile': 'error',
      'svelte/require-each-key': 'error',
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used' }],
    },
  },
  {
    ignores: [
      'node_modules',
      'package-lock.json',
      'public/build/',
      'rollup.config.js',
      'setupTypeScript.js',
    ],
  },
];
