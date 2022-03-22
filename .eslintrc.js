module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports'],
  rules: {
    'no-shadow': 'off',
    'react-native/no-inline-styles': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'unused-imports/no-unused-imports': ['error'],
  },
};
