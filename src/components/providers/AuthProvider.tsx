


import React, { createContext, FC, useEffect, useMemo, useState, ReactNode } from 'react';
import { IUser, TypeSetState } from '../../types';
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';
import { users } from '../layout/sidebar/dataUsers';
import { useNavigate } from 'react-router-dom';
import { getFirestore, Firestore } from 'firebase/firestore';

interface IContext {
  user: IUser | null;
  setUser: TypeSetState<IUser | null>;
  ga: Auth;
  db: Firestore;
  loading: boolean;
}

export const AuthContext = createContext<IContext>({} as IContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true); 
  const ga = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const unListen = onAuthStateChanged(ga, (authUser) => {
      if (authUser) {
        setUser({
          id: Number(authUser.uid) || 1,
          avatar: users[1]?.avatar || '',
          name: authUser.displayName || '',
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unListen();
    };
  }, [ga]);

  const values = useMemo(() => ({
    user,
    setUser,
    ga,
    db,
    loading,
  }), [user, ga, db, loading]);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: 50 }}>Загрузка...</div>;
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
