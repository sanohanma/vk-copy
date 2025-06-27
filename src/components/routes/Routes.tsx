// // src/routes/RoutesComponent.tsx
// import React, { FC } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { routes } from './list';
// import Layout from '../layout/Layout';
// import Error404 from '../pages/Error404';
// import { useAuth } from '../providers/useAuth';

// const RoutesComponent: FC = () => {
//   const { user } = useAuth();

//   return (
//     <Routes>
//       {routes.map((route) => {
//         const element =
//           route.auth && !user ? (
//             <Navigate to="/auth" replace />
//           ) : (
//             <Layout>{route.element}</Layout>
//           );

//         return <Route key={route.path} path={route.path} element={element} />;
//       })}
//       <Route path="*" element={<Error404 />} />
//     </Routes>
//   );
// };

// export default RoutesComponent;

// src/components/routes/RoutesComponent.tsx
import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './list';
import Layout from '../layout/Layout';
import Error404 from '../pages/Error404';
import { useAuth } from '../providers/useAuth'; // Проверь путь к useAuth

const RoutesComponent: FC = () => {
  // Получаем контекст аутентификации
  const authContext = useAuth();

  // Если контекст по какой-то причине null (что не должно произойти, если AuthProvider обернут правильно),
  // показываем ошибку. TypeScript поймет, что после этой проверки authContext не будет null.
  if (!authContext) {
    console.error("AuthContext not provided. Ensure AuthProvider wraps your application.");
    return <div>Ошибка: Контекст аутентификации недоступен.</div>;
  }

  // Деструктурируем user и loading из гарантированно не-null authContext
  // TypeScript теперь должен быть доволен.
  const { user, loading } = authContext;

  if (loading) {
    return <div>Загрузка приложения...</div>;
  }

  return (
    <Routes>
      {routes.map((route) => {
        const element = route.auth ? (
          user ? (
            <Layout>{route.element}</Layout>
          ) : (
            <Navigate to="/auth" replace />
          )
        ) : (
          user && route.path === '/auth' ? (
              <Navigate to="/" replace />
          ) : (
              route.element
          )
        );

        return <Route key={route.path} path={route.path} element={element} />;
      })}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default RoutesComponent;