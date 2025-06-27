// src/components/providers/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context; // ожидается { user, db }
};
