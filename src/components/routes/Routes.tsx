// src/components/routes/RoutesComponent.tsx
import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './list';
import Layout from '../layout/Layout';
import Error404 from '../pages/Error404';
import { useAuth } from '../providers/useAuth';

const RoutesComponent: FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;  // Можно заменить на любой спиннер/шаблон загрузки
  }

  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          const element =
            route.auth && !user ? (
              <Navigate to="/auth" replace />
            ) : (
              <Layout>{route.element}</Layout>
            );

          return <Route key={route.path} path={route.path} element={element} />;
        })}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;

