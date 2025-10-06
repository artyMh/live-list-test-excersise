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
    '@stylistic/key-spacing': ["error", { "beforeColon": false }],
    '@stylistic/keyword-spacing': ["error", { "before": true }],
    '@stylistic/line-comment-position':["error", { "position": "above", "ignorePattern": "pragma" }],
    '@stylistic/linebreak-style': ["error", "unix"],
    '@stylistic/lines-around-comment': ["error", { "beforeBlockComment": true }],
    '@stylistic/lines-between-class-members': ["error", "always"],
    '@stylistic/max-len': ["error", { "code": 140 }],
    '@stylistic/max-statements-per-line': ["error", { "max": 1 }],
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
    '@stylistic/multiline-comment-style': ["error", "starred-block"],
    '@stylistic/multiline-ternary': ["error", "always", { "ignoreJSX": true }],
    '@stylistic/new-parens': "error",
    '@stylistic/newline-per-chained-call': ["error", { "ignoreChainWithDepth": 2 }],
    '@stylistic/no-confusing-arrow': ["error", {"onlyOneSimpleParam": true }],
    '@stylistic/no-extra-parens': ["error", "all"],
    '@stylistic/no-extra-semi': "error",
    '@stylistic/no-floating-decimal': "error",
    '@stylistic/no-mixed-operators': "error",
    '@stylistic/no-mixed-spaces-and-tabs': "error",
    '@stylistic/no-multi-spaces': "error",
    '@stylistic/no-multiple-empty-lines': ["error", { "max": 2, "maxEOF": 0 }],
    '@stylistic/no-tabs': "error",
    '@stylistic/no-trailing-spaces': "error",
    '@stylistic/no-whitespace-before-property': "error",
    '@stylistic/nonblock-statement-body-position': ["error", "below"],
    '@stylistic/object-curly-newline': ["error", { "ObjectExpression": "always", "ObjectPattern": "never" }],
    '@stylistic/object-curly-spacing': ["error", "never"],
    // '@stylistic/object-property-newline': "error",
    '@stylistic/one-var-declaration-per-line': ["error", "initializations"],
    '@stylistic/operator-linebreak': ["error", "before"],

  },
}