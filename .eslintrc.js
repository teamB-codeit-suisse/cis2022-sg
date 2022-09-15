module.exports = {
  root: false,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended', // Recommended ESLint rules
    'plugin:@typescript-eslint/eslint-recommended', // Disables rules from `eslint:recommended` that are already covered by the TypeScript typechecker
    'plugin:@typescript-eslint/recommended', // Recommended TypeScript rules
    'prettier/@typescript-eslint', // Disables rules from `@typescript-eslint/recommended` that are covered by Prettier
    'plugin:prettier/recommended', // Recommended Prettier rules
  ],
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['build', 'dist', 'node_modules', 'db'],
  rules: {
    "spaced-comment": ["error", "always"],
    camelcase: 'off',
    // turn the next 2 off later
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/naming-convention': [
      'off',
      // {
      //   selector: 'default',
      //   format: ['camelCase'],
      // },

      // {
      //   selector: 'variable',
      //   format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      // },
      // {
      //   selector: 'parameter',
      //   format: ['camelCase'],
      //   leadingUnderscore: 'allow',
      // },

      // {
      //   selector: 'memberLike',
      //   modifiers: ['private'],
      //   format: ['camelCase'],
      //   leadingUnderscore: 'require',
      // },

      // {
      //   selector: 'typeLike',
      //   format: ['PascalCase'],
      // },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
  },
  overrides: [{
    files: ['./src/scripts/**/*.ts'],
    rules: {
      'no-console': 'off'
    }
  }]
}
