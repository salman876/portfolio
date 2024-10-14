# Portfolio

A pet project written in React Vite and Typescript.

## Features

- Uses emotion and styled components to make up the design.
- Uses Tanstack's React Query (uses axios for data fetching).
- Uses Tanstack's React Table for table sorting and pagination.
- Uses React Hook Form with yup validator for forms.
- React dom router for routing.
- react-hot-toast for toasts.
- TradingView Lightweight chart for charting.
- vitetest for unit tests. Also uses React testing library and jest-dom setup w/vitest for DOM tests.
- comprehensive and picky eslint rules.
- prettier with my flavor for sorting import orders.
- CI/CD set up. CI goes through type checks, unused import checks, formats code, lints and run tests using Github Actions. CD goes to Github Pages.
- Vite uses Rollup for its bundling. Added a Rollup config to set charts as a seprate chunk to reduce chunk size.
- Dockerized app. Can be built and run using docker.

## Installation

To run a local dev server, clone project, install deps and run!

```sh
yarn install
yarn dev
```

To run a preview environment, which is a prod build with a prod runtime.

```sh
yarn preview
```

## Run using Docker

You can run this app on docker. The app uses nginx to serve assets and log request or access logs.

```sh
// build the app
docker build -t portfolio .

// run the app
docker run -p 3000:3000 portfolio
```

you can visit the app on port 3000, http://localhost:3000/

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
└── Dockerfile            # Dockerfile to build and run the app.
└── nginx.conf            # nginx server configuration. The dockerized app will use this server config log requests, access logs and more.
```

This structure separates concerns and makes it easy to locate and manage different parts of the application. The `components` directory contains reusable UI elements, while `pages` holds the main views. The `api` directory manages API interactions.

## ESLint Configuration

This project uses a comprehensive set of ESLint plugins and rules to ensure code quality and consistency. Here's a brief explanation of the extends, plugins, and some key rules:

### Plugins

- `@typescript-eslint`: Provides TypeScript-specific linting rules.
- `eslint-comments`: Adds rules for ESLint directive comments.
- `react`: Adds React-specific linting rules.
- `shopify-lean`: Includes Shopify's custom ESLint rules.
- `jsx-a11y`: Checks accessibility rules on JSX elements.
- `styled-components-a11y`: Provides accessibility rules for styled-components.

### Extends

- `'airbnb-typescript'`: Provides a robust set of rules based on Airbnb's JavaScript style guide, adapted for TypeScript.
- `'plugin:@typescript-eslint/recommended'`: Adds recommended rules for TypeScript projects.
- `'plugin:@typescript-eslint/recommended-requiring-type-checking'`: Enables additional TypeScript rules that require type information.
- `'plugin:eslint-comments/recommended'`: Adds best practices for ESLint directive comments.
- `'plugin:import/recommended'` and `'plugin:import/typescript'`: Provide rules for validating imports, including TypeScript-specific imports.
- `'plugin:react-hooks/recommended'`: Enforces React Hooks rules.
- `'plugin:jsx-a11y/recommended'`: Adds recommended accessibility rules for JSX.
- `'plugin:styled-components-a11y/recommended'`: Provides accessibility rules for styled-components.
- `'plugin:prettier/recommended'`: Integrates Prettier with ESLint, ensuring consistent code formatting.

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

These rules and plugins help maintain code quality, prevent common errors, and enforce best practices in React and TypeScript development. It is something I have aquired over the years working with different teams and projects.

## Prettier Configuration

This project uses Prettier for consistent code formatting. Here's a breakdown of my Prettier configuration:

- **plugins**: Uses `@trivago/prettier-plugin-sort-imports` for sorting imports.
- **arrowParens**: Avoids parentheses around a sole arrow function parameter. Do not need them.
- **printWidth**: Sets the line width to 120 characters.
- **singleQuote**: Uses single quotes instead of double quotes.
- **trailingComma**: Adds trailing commas wherever possible.
- **semi**: Adds semicolons at the ends of statements. All great things must end with a `;`.
- **importOrder**: Defines a specific order for import statements, grouped by type.
- **importOrderSeparation**: Adds a newline between import groups.
- **importOrderSortSpecifiers**: Alphabetically sorts import specifiers.

I have got OCD for import orders as well as approprite new lines between import groups.

## Nice to haves

- Sentry error reporting
- GA4 analytics
- i18n with i18n-next
