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

## Nice to haves
- Sentry error reporting
- GA4 analytics
- i18n with i18n-next