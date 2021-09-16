module.exports = {
  ignorePatterns: ['.eslintrc.js', 'webpack.config.*.ts', 'scripts/**/*'],
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    'react/jsx-filename-extension': 0,
    'no-use-before-define': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exaustive-deps": "warn", // Checks effect dependencies
    "no-alert": "off",
    'no-unused-vars': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['webpack.config.*.ts'],
      optionalDependencies: false,
    }],
  },
}
