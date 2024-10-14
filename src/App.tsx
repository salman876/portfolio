import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import { AppRoute } from 'enums/routes';

import { AssetsProvider } from 'contexts/assets';

import { AssetDetails } from 'pages/AssetDetails';
import { Portfolio } from 'pages/Portfolio';

import { BaseLayout } from 'components/BaseLayout';

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <AssetsProvider>
      <QueryClientProvider client={queryClient}>
        <BaseLayout>
          <Routes>
            <Route element={<Portfolio />} path={AppRoute.Portfolio} />
            <Route element={<AssetDetails />} path={AppRoute.AssetDetails} />
          </Routes>
          <Toaster />
        </BaseLayout>
      </QueryClientProvider>
    </AssetsProvider>
  );
};
