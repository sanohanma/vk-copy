import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './list'; // ✅ относительный путь
import Layout from '../layout/Layout';
import Error404 from '../pages/Error404'; // ты можешь сделать эту страницу отдельно или добавить в /pages/common

const RoutesComponent: FC = () => {
  const isAuth = true;

  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          const element = route.auth && !isAuth
            ? <Navigate to="/auth" replace />
            : <Layout>{route.element}</Layout>;

          return (
            <Route
              key={route.path}
              path={route.path}
              element={element}
            />
          );
        })}

        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;

