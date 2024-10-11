const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },

  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, 'src')],
      },
    },
  },
  plugins: ['@typescript-eslint', 'eslint-comments', 'react', 'shopify-lean', 'jsx-a11y', 'styled-components-a11y'],
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:styled-components-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
  ],
  rules: {
    'import/order': [
      'error',
      {
        groups: ['type'],
      },
    ],
    'jsx-a11y/no-autofocus': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'prettier/prettier': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'eslint-comments/disable-enable-pair': 'off',
    'no-underscore-dangle': 'off',
    'import/named': 'off',
    'jsx-a11y/href-no-hash': 'off',
    'no-void': 'off',
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/jsx-no-target-blank': [
      'error',
      {
        allowReferrer: false,
        enforceDynamicLinks: 'always',
      },
    ],
    'react/require-default-props': 'off',
    'max-len': [
      'warn',
      {
        code: 120,
        comments: 120,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        tabWidth: 2,
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.ts', '**/*.test.tsx'],
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/unbound-method': 'off',
    'shopify-lean/typescript/prefer-pascal-case-enums': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          arguments: false,
          attributes: false,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['*.test.js', '*.test.jsx', '*.test.tsx', '*.test.ts'],
      rules: {
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
      },
    },
  ],
};
