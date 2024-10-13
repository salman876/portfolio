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

## Nice to haves
- Sentry error reporting
- GA4 analytics
- i18n with i18n-next
