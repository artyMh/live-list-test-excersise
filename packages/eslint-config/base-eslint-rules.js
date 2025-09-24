export default {
  rules: {
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-cond-assign': ['error', 'always'],
    'no-unreachable': 'warn',
    'no-extra-boolean-cast': ['error', { 'enforceForInnerExpressions': true }],
    'no-implicit-coercion': ['error'],
    'padding-line-between-statements': ['error',
      {
        'blankLine': 'always',
        'prev': '*',
        'next': 'return'
      },
      {
        'blankLine': 'always',
        'prev': ['case', 'default'],
        'next': '*'
      }
    ],

    '@stylistic/semi': ['error', 'never'],
    '@stylistic/quotes': ['error', 'single'],
    
    '@stylistic/member-delimiter-style': ['error',
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

    '@stylistic/array-bracket-newline': ['error', 'never'],
    '@stylistic/array-bracket-spacing': ['error', 'never'],
    '@stylistic/array-element-newline': ['error', 'never'],
    '@stylistic/arrow-parens': ['error', 'as-needed'],
    '@stylistic/arrow-spacing': 'error',
    '@stylistic/block-spacing': 'error',
    '@stylistic/brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    '@stylistic/comma-dangle': ['error', 'always-multiline'],
    '@stylistic/comma-spacing': ['error', { 'before': false, 'after': true }],
    '@stylistic/computed-property-spacing': ['error', 'never'],
    '@stylistic/curly-newline': ['error', 'always'],
    '@stylistic/dot-location:': ['off'],
    '@stylistic/function-call-argument-newline': ['error', 'never'],
    '@stylistic/function-call-spacing': ['error', 'never'],
    '@stylistic/function-paren-newline': ['error', 'multiline'],
    '@stylistic/generator-star-spacing': ['error', {'before': true, 'after': false}],
    '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],
    '@stylistic/indent': ['error', 2],
    '@stylistic/indent-binary-ops': ['error', 2],
  },
}