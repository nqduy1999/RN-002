// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  ...expoConfig,
  {
    ignores: ['dist/*', 'node_modules/*'],
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      'import/ignore': ['node_modules'],
      'import/extensions': ['.js', '.jsx', '.json'],
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.json'],
        },
      },
    },
    rules: {
      'import/no-unresolved': ['error', {
        ignore: ['^@common/', '^@assets/', '^@hooks/', '^@constants/'],
      }],
    },
  },
]);
