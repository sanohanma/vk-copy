// src/components/providers/AuthProvider.tsx
import React, { createContext, useState, useEffect } from 'react';
import { db } from '../../firebase';
 // путь зависит от расположения файла
// путь к firebase.ts
import { IUser } from '../../types';

interface AuthContextType {
  user: IUser | null;
  db: typeof db;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  db,
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Здесь для простоты зафиксируем пользователя (например, Ислам)
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    // Имитируем получение юзера (нужно заменить на реальную авторизацию)
    setUser({
      id: 'HFP89AAbAuYT39PLJrVMJB3qEVo2',
      name: 'Ислам Догдурбаев',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJzEaxLN-jGRYYUO65pWu7Q9GXoNt4LUSSA&s',
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, db }}>
      {children}
    </AuthContext.Provider>
  );
};

