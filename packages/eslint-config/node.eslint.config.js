import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals';

import baseRules from './base-eslint-rules.js'
import styleRules from './style-eslint-rules.js'

export default defineConfig([
  tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: {
      js,
      '@stylistic': stylistic,
    },
    extends: ["js/recommended"],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      ...baseRules.rules,
      ...styleRules.rules,

      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/naming-convention': [ 'error',
        {
          'selector': 'memberLike',
          'modifiers': [ 'private' ],
          'format': [ 'camelCase', 'UPPER_CASE' ],
          'leadingUnderscore': 'forbid'
        }
      ],
      '@typescript-eslint/no-inferrable-types': [ 'error',
        {
          'ignoreParameters': true
        }
      ],
      '@typescript-eslint/member-ordering': [ 'error',
        {
          'default': {
            'memberTypes': [
              'public-decorated-field',
              'public-static-field',
              'protected-static-field',
              'private-static-field',
              'public-instance-field',
              'public-abstract-field',
              'protected-instance-field',
              'protected-decorated-field',
              'protected-abstract-field',
              'private-instance-field',
              'private-decorated-field',
              'static-field',
              'public-field',
              'instance-field',
              'protected-field',
              'private-field',
              'abstract-field',
              'constructor',
              'public-static-method',
              'protected-static-method',
              'private-static-method',
              'public-method',
              'protected-method',
              'private-method'
            ]
          }
        }
      ],
    },
  },
]);


/*
module.exports = {
  'parser': '@typescript-eslint/parser',
  'extends': ['plugin:@typescript-eslint/recommended'],
  'parserOptions': { 'ecmaVersion': 2018, 'sourceType': 'module' },
  'rules': {
    '@typescript-eslint/indent': [ 'error', 2 ],
    '@typescript-eslint/semi': [ 'error', 'never' ],
    '@typescript-eslint/quotes': [ 'error', 'single' ],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/member-delimiter-style': [ 'error',
      {
        'multiline': {
          'delimiter': 'none',
          'requireLast': true
        },
        'singleline': {
          'delimiter': 'comma',
          'requireLast': false
        }
      }
    ],
    '@typescript-eslint/naming-convention': [ 'error',
      {
        'selector': 'memberLike',
        'modifiers': [ 'private' ],
        'format': [ 'camelCase', 'UPPER_CASE' ],
        'leadingUnderscore': 'forbid'
      }
    ],
    '@typescript-eslint/no-inferrable-types': [ 'error',
      {
        'ignoreParameters': true
      }
    ],
    '@typescript-eslint/member-ordering': [ 'error',
      {
        'default': {
          'memberTypes': [
            'public-decorated-field',
            'public-static-field',
            'protected-static-field',
            'private-static-field',
            'public-instance-field',
            'public-abstract-field',
            'protected-instance-field',
            'protected-decorated-field',
            'protected-abstract-field',
            'private-instance-field',
            'private-decorated-field',
            'static-field',
            'public-field',
            'instance-field',
            'protected-field',
            'private-field',
            'abstract-field',
            'constructor',
            'public-static-method',
            'protected-static-method',
            'private-static-method',
            'public-method',
            'protected-method',
            'private-method'
          ]
        }
      }
    ],

    'semi': 'off',
    'quotes': 'off',
    'indent': 'off',
    'no-unused-vars': ['off'],
    'no-console': 'warn',
    'no-cond-assign': 'off',
    'no-unreachable': 'warn',
    'no-extra-boolean-cast': 'warn',
    'padding-line-between-statements': [ 'error',
      {
        'blankLine': 'always',
        'prev': '*',
        'next': 'return'
      },
      {
        'blankLine': 'always',
        'prev': [ 'case', 'default' ],
        'next': '*'
      }
    ],
    'no-implicit-coercion': [ 'error' ],
  }
}

*/