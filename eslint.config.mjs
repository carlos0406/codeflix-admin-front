import globals from 'globals';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jsConfig from '@eslint/js';
import * as tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['dist/*', 'node_modules/*'],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json', // Adiciona o projeto para análise de tipos
        tsconfigRootDir: '.', // Diretório raiz do tsconfig.json
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: reactPlugin,
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
    },
    rules: {
      // React rules
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',

      // Prettier rules
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'es5',
          tabWidth: 2,
          semi: true,
          printWidth: 80,
          bracketSpacing: true,
          jsxBracketSameLine: false,
          arrowParens: 'always',
          endOfLine: 'auto',
        },
      ],

      // General formatting rules
      indent: ['error', 2],
      'jsx-quotes': ['error', 'prefer-double'],
      'max-len': ['error', { code: 80 }],
      'object-curly-spacing': ['error', 'always'],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: '.',
      },
    },
    rules: {
      '@typescript-eslint/await-thenable': 'error',
    },
  },
  ...tseslint.configs.recommendedTypeChecked,
];
