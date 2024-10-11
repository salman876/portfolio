import { Route, Routes } from 'react-router-dom';

import { AppRoute } from 'enums/routes';

import { Portfolio } from 'pages/portfolio';

import { BaseLayout } from 'components/BaseLayout';

export const App = () => {
  return (
    <BaseLayout>
      <Routes>
        <Route element={<Portfolio />} path={AppRoute.Portfolio} />
      </Routes>
    </BaseLayout>
  );
};
