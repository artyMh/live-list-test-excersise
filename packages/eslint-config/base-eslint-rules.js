export default {
  rules: {
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-cond-assign': ['error', 'always'],
    'no-unreachable': 'warn',
    'no-extra-boolean-cast': ['error', { 'enforceForInnerExpressions': true }],
    'no-implicit-coercion': ['error'],
  },
}