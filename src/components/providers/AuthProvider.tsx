// // src/components/providers/AuthProvider.tsx
// import React, { createContext, useState, useEffect } from 'react';
// import { db } from '../../firebase';
//  // путь зависит от расположения файла
// // путь к firebase.ts
// import { IUser } from '../../types';

// interface AuthContextType {
//   user: IUser | null;
//   db: typeof db;
// }

// export const AuthContext = createContext<AuthContextType>({
//   user: null,
//   db,
// });

// export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
//   // Здесь для простоты зафиксируем пользователя (например, Ислам)
//   const [user, setUser] = useState<IUser | null>(null);

//   useEffect(() => {
//     // Имитируем получение юзера (нужно заменить на реальную авторизацию)
//     setUser({
//       id: 'HFP89AAbAuYT39PLJrVMJB3qEVo2',
//       name: 'Ислам Догдурбаев',
//       avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJzEaxLN-jGRYYUO65pWu7Q9GXoNt4LUSSA&s',
//     });
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, db }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// src/components/providers/AuthProvider.tsx


// src/components/providers/AuthProvider.tsx
// src/components/providers/AuthProvider.tsx
import React, { createContext, useState, useEffect } from 'react';
import { db, auth } from '../../firebase'; // Импортируем auth
import { IUser } from '../../types';

interface AuthContextType {
  user: IUser | null;
  db: typeof db;
  ga: typeof auth; // Используем настоящий auth
  switchUser: (userId: string) => void;
  signOut: () => void;
  users: IUser[];
}

// Временно копируем пользователей сюда
const mockUsers = [
  {
    id: 'HFP89AAbAuYT39PLJrVMJB3qEVo2',   
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJzEaxLN-jGRYYUO65pWu7Q9GXoNt4LUSSA&s',
    name: 'Ислам Догдурбаев',
    isInNetwork: true,
  },
  {
    id: '4cqilU69JXMTBB3ZqaEXRIgNADl1',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDGMp734S91sDuUFqL51_xRTXS15iiRoHew&s',
    name: 'Коля Буткеевич',
    isInNetwork: true,
  },
  {
    id: '123',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s',
    name: 'Байэль Найманбаев',
    isInNetwork: false,
  },
  {
    id: '312',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9HmFbbpyWD4BVefTt5Ic0yq3EMCICTtqPbw&s',
    name: 'Султан Акматбеков',
    isInNetwork: false,
  },
  {
    id: '999',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvCiFg3WKJJD9wl2z94g3-1oEAJ-Baul_GCw&s',
    name: 'Маша Иванова',
    isInNetwork: false,
  },
];

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // По умолчанию входим как Ислам
    if (isLoggedIn) {
      setUser(mockUsers[0]);
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);

  const switchUser = (userId: string) => {
    const newUser = mockUsers.find(u => u.id === userId);
    if (newUser) {
      setUser(newUser);
    }
  };

  const signOut = () => {
    setIsLoggedIn(false);
    setUser(null);
    // Редирект на страницу авторизации
    window.location.href = '/auth';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      db, 
      ga: auth, // Передаем настоящий auth
      switchUser, 
      signOut,
      users: mockUsers 
    }}>
      {children}
    </AuthContext.Provider>
  );
};