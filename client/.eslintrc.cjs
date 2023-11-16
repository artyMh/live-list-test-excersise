module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prefer-stateless-function': [1, {}],
    'react/prop-types': 'off',
    'react/jsx-key': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

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
  },
}
