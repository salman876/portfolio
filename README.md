# Portfolio

A pet project written in React Vite and Typescript.

## Features

- Uses emotion and styled components to make up the design.
- Uses Tanstack's React Query (uses axios for data fetching).
- Uses Tanstack's React Table for table sorting and pagination. 
- Uses React Hook Form with yup validator for forms.
- React dom router for routing.
- react-hot-toast for toasts.
- vitetest for unit tests.
- comprehensive and picky eslint rules.
- prettier with my flavor for sorting import orders.
- CI/CD set up. CI goes through type checks, unused import checks, formats code, lints and run tests using Github Actions. CD goes to Github Pages.

## Installation

To run a local dev server, clone project, install deps and run!

```sh
yarn install
yarn dev
```

To run a preview environment,

```sh
yarn preview
```

### run via Docker

## Project structure
The project follows a typical React application structure with some additional organization for better maintainability:

```
/
├── public/               # Public assets
│   ├── assets/           # Static assets (icons, fonts, etc.)
├── src/
│   ├── api/              # API services and data fetching
│   ├── components/       # Reusable React components
│   │   └── form/         # Form components derived from UI components for controlled inputs.
│   │   └── ui/           # UI components (buttons, inputs, etc.)
│   ├── constants/        # App constants
│   ├── contexts/         # App contexts
│   ├── enums/            # TypeScript enums definitions
│   ├── pages/            # Page components
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main App component
│   └── main.tsx          # Entry point
├── .env                  # env vars
├── .eslintrc.cjs         # ESLint configuration
├── .prettierrc           # Prettier configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── vitest.config.ts      # Vitest configuration
└── package.json          # Project dependencies and scripts
```

This structure separates concerns and makes it easy to locate and manage different parts of the application. The `components` directory contains reusable UI elements, while `pages` holds the main views. The `api` directory manages API interactions.

## ESLint Configuration

This project uses a comprehensive set of ESLint plugins and rules to ensure code quality and consistency. Here's a brief explanation of the extends, plugins, and some key rules:

### Extends

The `extends` array in our ESLint configuration incorporates several preset configurations:

- `'airbnb-typescript'`: Provides a robust set of rules based on Airbnb's JavaScript style guide, adapted for TypeScript.
- `'plugin:@typescript-eslint/recommended'`: Adds recommended rules for TypeScript projects.
- `'plugin:@typescript-eslint/recommended-requiring-type-checking'`: Enables additional TypeScript rules that require type information.
- `'plugin:eslint-comments/recommended'`: Adds best practices for ESLint directive comments.
- `'plugin:import/recommended'` and `'plugin:import/typescript'`: Provide rules for validating imports, including TypeScript-specific imports.
- `'plugin:react-hooks/recommended'`: Enforces React Hooks rules.
- `'plugin:jsx-a11y/recommended'`: Adds recommended accessibility rules for JSX.
- `'plugin:styled-components-a11y/recommended'`: Provides accessibility rules for styled-components.
- `'plugin:prettier/recommended'`: Integrates Prettier with ESLint, ensuring consistent code formatting.

These extensions provide a solid foundation of rules and best practices for React and TypeScript development, accessibility, and code style.

### Plugins

- `@typescript-eslint`: Provides TypeScript-specific linting rules.
- `eslint-comments`: Adds rules for ESLint directive comments.
- `react`: Adds React-specific linting rules.
- `shopify-lean`: Includes Shopify's custom ESLint rules.
- `jsx-a11y`: Checks accessibility rules on JSX elements.
- `styled-components-a11y`: Provides accessibility rules for styled-components.

### Key Rules

- `"import/order"`: Enforces a consistent order of import statements.
- `"jsx-a11y/no-autofocus": "off"`: Allows the use of autofocus attribute.
- `"react-hooks/exhaustive-deps": "error"`: Ensures all dependencies are correctly specified in useEffect and similar hooks.
- `"import/prefer-default-export": "off"`: Allows named exports without requiring a default export.
- `"import/no-default-export": "error"`: Disallows default exports.
- `"react/react-in-jsx-scope": "off"`: Allows JSX without importing React (for React 17+).
- `"max-len"`: Sets maximum line length with various exceptions.
- `"@typescript-eslint/no-unused-vars": "error"`: Reports unused variables.
- `"@typescript-eslint/no-non-null-assertion": "error"`: Disallows non-null assertions using the ! postfix operator.

These rules and plugins help maintain code quality, prevent common errors, and enforce best practices in React and TypeScript development.

## Nice to haves
- Sentry error reporting
- GA4 analytics
- i18n with i18n-next
