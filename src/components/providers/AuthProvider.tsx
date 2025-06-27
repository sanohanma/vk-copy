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
import React, { FC, createContext, useState, useEffect } from 'react';
import { auth, db } from '../../firebase'; // <-- Убедись, что путь '../../firebase' правильный!
import { onAuthStateChanged, User as FirebaseUser, signOut as firebaseSignOut } from 'firebase/auth';

// Определяем интерфейс для пользователя.
// Теперь name, avatar, email и isInNetwork могут быть опциональными,
// так как не все данные могут прийти напрямую из Firebase.
export interface IUser {
  id: string; // Это будет UID из Firebase
  name?: string | null; // Может быть не у всех Firebase-пользователей
  avatar?: string | null; // Может быть не у всех Firebase-пользователей
  email?: string | null; // Добавили email
  isInNetwork?: boolean; // Для моковых данных, по умолчанию false
}

// Интерфейс для контекста аутентификации
interface AuthContextType {
  user: IUser | null;
  db: typeof db;
  ga: typeof auth;
  signOut: () => void;
  users: IUser[]; // Список всех моковых пользователей
  loading: boolean;
}

// Создаем контекст
export const AuthContext = createContext<AuthContextType | null>(null);

// Твои моковые пользователи.
// ВАЖНО: ID "Ислама Догдурбаева" ДОЛЖЕН БЫТЬ ТВОИМ РЕАЛЬНЫМ FIREBASE UID: QcgPwquGiiRTCtJMMA8iBaNcuj42
// Ссылки на аватары ДОЛЖНЫ БЫТЬ РАБОЧИМИ. Я использую picsum.photos для примера.
const mockUsers: IUser[] = [
  {
    id: '9fxqMJHOHlaSqcgB5qqua4ybp6w1', // <--- ТВОЙ РЕАЛЬНЫЙ FIREBASE UID СЮДА!
    avatar: 'https://picsum.photos/id/237/150/150', // Рабочая заглушка
    name: 'Ислам Догдурбаев',
    isInNetwork: true,
    email: 'islam.dogdurbayev@example.com' // Пример email
  },
  {
    id: 'KrrQ5vp9ppM8ymprJucN82THkQC3',
    avatar: 'https://picsum.photos/id/238/150/150',
    name: 'Коля Буткеевич',
    isInNetwork: true,
    email: 'kolya.butkeevich@example.com'
  },
  {
    id: '123',
    avatar: 'https://picsum.photos/id/239/150/150',
    name: 'Байэль Найманбаев',
    isInNetwork: false, // Байэль не в сети
    email: 'bayel.naimanbaev@example.com'
  },
  {
    id: '312',
    avatar: 'https://picsum.photos/id/240/150/150',
    name: 'Султан Акматбеков',
    isInNetwork: false, // Султан не в сети
    email: 'sultan.akmatbekov@example.com'
  },
  {
    id: '999',
    avatar: 'https://picsum.photos/id/241/150/150',
    name: 'Маша Иванова',
    isInNetwork: false, // Маша не в сети
    email: 'masha.ivanova@example.com'
  },
];


const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      console.log('Firebase auth state changed:', firebaseUser); // Лог состояния Firebase

      if (firebaseUser) {
        // Если пользователь авторизован через Firebase
        // Ищем его в нашем моковом списке по UID
        const foundMockUser = mockUsers.find(mu => mu.id === firebaseUser.uid);

        let currentUserData: IUser;

        if (foundMockUser) {
          // Если нашли в моковых пользователях, объединяем данные
          currentUserData = {
            id: firebaseUser.uid,
            name: foundMockUser.name || firebaseUser.displayName || firebaseUser.email,
            avatar: foundMockUser.avatar || firebaseUser.photoURL,
            email: firebaseUser.email,
            isInNetwork: foundMockUser.isInNetwork,
          };
          console.log('User found in mockUsers. Merged data:', currentUserData);
        } else {
          // Если не нашли в моковых (новый Firebase пользователь), используем только данные из Firebase
          currentUserData = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email,
            avatar: firebaseUser.photoURL,
            email: firebaseUser.email,
            isInNetwork: true, // По умолчанию, если новый пользователь, он "в сети"
          };
          console.log('User NOT found in mockUsers. Using Firebase data:', currentUserData);
        }
        setUser(currentUserData); // Устанавливаем объединенные данные
      } else {
        // Если пользователь не авторизован
        setUser(null);
        console.log('No Firebase user. Setting user to null.');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null); // Очищаем пользователя после выхода
      console.log('User signed out. User set to null.');
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      db,
      ga: auth,
      signOut,
      users: mockUsers, // Передаем полный список моковых пользователей
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; // <-- Убедись, что здесь export default!





