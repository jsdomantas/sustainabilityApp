module.exports = {
  env: {
    jest: true,
  },
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['e2e'],
  plugins: ['@typescript-eslint', 'unused-imports', 'detox'],
  rules: {
    'no-shadow': 'off',
    'react-native/no-inline-styles': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'unused-imports/no-unused-imports': ['error'],
    'react-hooks/exhaustive-deps': 'off',
  },
};
