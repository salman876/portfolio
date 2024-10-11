import { Route, Routes } from 'react-router-dom';

import { AppRoute } from 'enums/routes';

import { Portfolio } from 'pages/portfolio';

export const App = () => {
  return (
    <Routes>
      <Route element={<Portfolio />} path={AppRoute.Portfolio} />
    </Routes>
  );
};
