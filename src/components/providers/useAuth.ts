// // src/components/providers/useAuth.ts
// import { useContext } from 'react';
// import { AuthContext } from './AuthProvider';

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   return context; // ожидается { user, db }
// };


import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context; // теперь возвращает { user, db, ga, switchUser, signOut, users }
};