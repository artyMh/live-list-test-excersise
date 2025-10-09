import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginJsx11y from 'eslint-plugin-jsx-a11y'
import pluginReactRefresh from 'eslint-plugin-react-refresh'

import baseRules from './base-eslint-rules.js'
import styleRules from './style-eslint-rules.js'
import jsxRules from './jsx-style-eslint-rules.js'

export default defineConfig([
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginJsx11y.flatConfigs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      js,
      '@stylistic': stylistic,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.node
      },
      ...pluginJsx11y.flatConfigs.recommended.languageOptions,
    },
    rules: {
      ...baseRules.rules,
      ...styleRules.rules,
      ...jsxRules.rules,

      'react/boolean-prop-naming': ['error'],
      'react/prefer-stateless-function': [1, {}],
      'react/prop-types': 'off',
      'react/jsx-key': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    }
  },
]);
