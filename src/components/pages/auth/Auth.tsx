
// import { Alert, Button, ButtonGroup, Grid, TextField } from '@mui/material';
// import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
// import { IUserData } from './types-auth';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { useAuth } from '../../providers/useAuth';
// import { useNavigate } from 'react-router-dom';

// const Auth: FC = () => {
//   const { ga, user } = useAuth();
//   const navigate = useNavigate();
  
//   const [isRegForm, setIsRegForm] = useState(false);
//   const [userData, setUserData] = useState<IUserData>({ email: '', password: '', name: '' });
//   const [error, setError] = useState('');

//   const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const auth = getAuth();
    
//     if (isRegForm) {
//       try {
//         const res = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
//         await updateProfile(res.user, { displayName: userData.name });
//         await signInWithEmailAndPassword(auth, userData.email, userData.password);
//       } catch (error: any) {
//         setError(error.message || 'Ошибка регистрации');
//       }
//     } else {
//       try {
//         await signInWithEmailAndPassword(auth, userData.email, userData.password);
//       } catch (error: any) {
//         setError(error.message || 'Ошибка авторизации');
//       }
//     }

//     setUserData({ email: '', password: '', name: '' });
//   };

//   useEffect(() => {
//     if (user) navigate('/');
//   }, [user, navigate]);

//   return (
//     <>
//       {error && <Alert severity="error" style={{ marginBottom: 20 }}>{error}</Alert>}
//       <Grid display="flex" justifyContent="center" alignItems="center">
//         <form onSubmit={handleLogin}>
//           {isRegForm && (
//             <TextField
//               type="text"
//               label="Name"
//               variant="outlined"
//               value={userData.name}
//               onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//               sx={{ display: 'block', marginBottom: 3 }}
//               required={isRegForm}
//             />
//           )}
//           <TextField
//             type="email"
//             label="Email"
//             variant="outlined"
//             value={userData.email}
//             onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//             sx={{ display: 'block', marginBottom: 3 }}
//             required
//           />
//           <TextField
//             type="password"
//             label="Password"
//             variant="outlined"
//             value={userData.password}
//             onChange={(e) => setUserData({ ...userData, password: e.target.value })}
//             sx={{ display: 'block', marginBottom: 3 }}
//             required
//           />
//           <ButtonGroup variant="outlined">
//             <Button type="submit" onClick={() => setIsRegForm(false)}>Auth</Button>
//             <Button type="submit" onClick={() => setIsRegForm(true)}>Register</Button>
//           </ButtonGroup>
//         </form>
//       </Grid>
//     </>
//   );
// };

// export default Auth;

// import { Alert, Button, ButtonGroup, Grid, TextField } from '@mui/material';
// import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { useAuth } from '../../providers/useAuth';
// import { useNavigate } from 'react-router-dom';

// interface IUserData {
//   email: string;
//   password: string;
//   name: string;
// }

// const Auth: FC = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [isRegForm, setIsRegForm] = useState(false);
//   const [userData, setUserData] = useState<IUserData>({ email: '', password: '', name: '' });
//   const [error, setError] = useState('');

//   const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError('');

//     const auth = getAuth();

//     if (isRegForm) {
//       try {
//         const res = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
//         if (res.user) {
//           await updateProfile(res.user, { displayName: userData.name });
//         }
//         await signInWithEmailAndPassword(auth, userData.email, userData.password);
//       } catch (error: any) {
//         setError(error.message || 'Ошибка регистрации');
//         return;
//       }
//     } else {
//       try {
//         await signInWithEmailAndPassword(auth, userData.email, userData.password);
//       } catch (error: any) {
//         setError(error.message || 'Ошибка авторизации');
//         return;
//       }
//     }

//     setUserData({ email: '', password: '', name: '' });
//   };

//   useEffect(() => {
//     if (user) navigate('/');
//   }, [user, navigate]);

//   return (
//     <>
//       {error && <Alert severity="error" style={{ marginBottom: 20 }}>{error}</Alert>}
//       <Grid display="flex" justifyContent="center" alignItems="center">
//         <form onSubmit={handleLogin} style={{ minWidth: 320 }}>
//           {isRegForm && (
//             <TextField
//               type="text"
//               label="Name"
//               variant="outlined"
//               value={userData.name}
//               onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//               sx={{ display: 'block', marginBottom: 3 }}
//               required
//             />
//           )}
//           <TextField
//             type="email"
//             label="Email"
//             variant="outlined"
//             value={userData.email}
//             onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//             sx={{ display: 'block', marginBottom: 3 }}
//             required
//           />
//           <TextField
//             type="password"
//             label="Password"
//             variant="outlined"
//             value={userData.password}
//             onChange={(e) => setUserData({ ...userData, password: e.target.value })}
//             sx={{ display: 'block', marginBottom: 3 }}
//             required
//           />
//           <ButtonGroup variant="outlined" fullWidth>
//             <Button
//               type="submit"
//               onClick={() => setIsRegForm(false)}
//               color={isRegForm ? 'inherit' : 'primary'}
//             >
//               Auth
//             </Button>
//             <Button
//               type="submit"
//               onClick={() => setIsRegForm(true)}
//               color={isRegForm ? 'primary' : 'inherit'}
//             >
//               Register
//             </Button>
//           </ButtonGroup>
//         </form>
//       </Grid>
//     </>
//   );
// };

// export default Auth;

import { Alert, Button, ButtonGroup, Grid, TextField } from '@mui/material';
import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'; // getAuth() нам больше не нужен, т.к. используем ga из useAuth
import { useAuth } from '../../providers/useAuth';
import { useNavigate } from 'react-router-dom';

interface IUserData {
  email: string;
  password: string;
  name: string;
}

const Auth: FC = () => {
  const { user, ga } = useAuth(); // Используем ga (это наш 'auth') из контекста
  const navigate = useNavigate();

  const [isRegForm, setIsRegForm] = useState(false);
  const [userData, setUserData] = useState<IUserData>({ email: '', password: '', name: '' });
  const [error, setError] = useState('');

  // Логика перенаправления, если пользователь уже авторизован
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    setError(''); // Сбрасываем предыдущие ошибки

    if (!userData.email || !userData.password || (isRegForm && !userData.name)) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    try {
      if (isRegForm) {
        // Регистрация
        const res = await createUserWithEmailAndPassword(ga, userData.email, userData.password);
        if (res.user) {
          await updateProfile(res.user, { displayName: userData.name });
          console.log('Пользователь успешно зарегистрирован и вошел!', res.user);
        }
        // После регистрации пользователь автоматически авторизуется,
        // поэтому повторный signInWithEmailAndPassword не нужен.
      } else {
        // Вход
        await signInWithEmailAndPassword(ga, userData.email, userData.password);
        console.log('Пользователь успешно вошел!');
      }
      // Если все успешно (используем useEffect для навигации)
      // setUserData({ email: '', password: '', name: '' }); // Очищаем форму
    } catch (firebaseError: any) { // Используем firebaseError для ясности
      console.error('Ошибка авторизации:', firebaseError);
      // Firebase ошибки имеют свойство code (например, 'auth/invalid-email')
      // Можно улучшить отображение ошибок для пользователя
      let errorMessage = 'Произошла неизвестная ошибка.';
      if (firebaseError.code) {
        switch (firebaseError.code) {
          case 'auth/invalid-email':
            errorMessage = 'Некорректный адрес электронной почты.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Пользователь отключен.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'Пользователь с таким email не найден.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Неверный пароль.';
            break;
          case 'auth/email-already-in-use':
            errorMessage = 'Этот email уже зарегистрирован.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Пароль должен быть не менее 6 символов.';
            break;
          default:
            errorMessage = firebaseError.message;
        }
      }
      setError(errorMessage);
    }
  };

  return (
    <>
      {error && (
        <Alert severity="error" style={{ marginBottom: 20 }}>
          {error}
        </Alert>
      )}
      <Grid display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
        <form onSubmit={handleSubmit} style={{ minWidth: 320, padding: 24, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
          {isRegForm && (
            <TextField
              type="text"
              label="Name"
              variant="outlined"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              sx={{ display: 'block', marginBottom: 3 }}
              required
            />
          )}
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            sx={{ display: 'block', marginBottom: 3 }}
            required
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            sx={{ display: 'block', marginBottom: 3 }}
            required
          />
          <ButtonGroup variant="outlined" fullWidth>
            <Button
              type="submit" // Обе кнопки сабмитят форму
              onClick={() => setIsRegForm(false)}
              color={isRegForm ? 'inherit' : 'primary'}
            >
              Войти
            </Button>
            <Button
              type="submit" // Обе кнопки сабмитят форму
              onClick={() => setIsRegForm(true)}
              color={isRegForm ? 'primary' : 'inherit'}
            >
              Регистрация
            </Button>
          </ButtonGroup>
        </form>
      </Grid>
    </>
  );
};

export default Auth;