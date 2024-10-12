import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';

import { AppRoute } from 'enums/routes';

import { Portfolio } from 'pages/portfolio';

import { BaseLayout } from 'components/BaseLayout';

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BaseLayout>
        <Routes>
          <Route element={<Portfolio />} path={AppRoute.Portfolio} />
        </Routes>
      </BaseLayout>
    </QueryClientProvider>
  );
};
