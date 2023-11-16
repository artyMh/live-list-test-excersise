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
