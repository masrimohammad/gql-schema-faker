module.exports = {
  extends: [
    'eslint-config-airbnb',
  ],
  rules: {
    'no-console': 'off',
    'no-unused-expressions': 'off',
    'no-underscore-dangle': 'off',
    'import/extensions': 'off',
    camelcase: 'off',
    'import/prefer-default-export': 'off',
    'function-paren-newline': 0,
    'no-param-reassign': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'max-len': ['error', { code: 150, ignoreTemplateLiterals: true, ignoreStrings: true }],
    'import/no-unresolved': [
      'error',
      {
        ignore: [
          'aws-lambda',
        ],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error', {
        devDependencies: [
          '**/test/*.js',
          '**/test*/*.js',
          '**/test*/*.ts',
        ],
      },
    ],
  },
  plugins: [
    '@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
  ignorePatterns: ['scripts/pools/*'],
  env: {
    jest: true,
  },
};
