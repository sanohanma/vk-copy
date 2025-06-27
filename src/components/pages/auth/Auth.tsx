
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

import { Alert, Button, ButtonGroup, Grid, TextField } from '@mui/material';
import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuth } from '../../providers/useAuth';
import { useNavigate } from 'react-router-dom';

interface IUserData {
  email: string;
  password: string;
  name: string;
}

const Auth: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isRegForm, setIsRegForm] = useState(false);
  const [userData, setUserData] = useState<IUserData>({ email: '', password: '', name: '' });
  const [error, setError] = useState('');

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const auth = getAuth();

    if (isRegForm) {
      try {
        const res = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        if (res.user) {
          await updateProfile(res.user, { displayName: userData.name });
        }
        await signInWithEmailAndPassword(auth, userData.email, userData.password);
      } catch (error: any) {
        setError(error.message || 'Ошибка регистрации');
        return;
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, userData.email, userData.password);
      } catch (error: any) {
        setError(error.message || 'Ошибка авторизации');
        return;
      }
    }

    setUserData({ email: '', password: '', name: '' });
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <>
      {error && <Alert severity="error" style={{ marginBottom: 20 }}>{error}</Alert>}
      <Grid display="flex" justifyContent="center" alignItems="center">
        <form onSubmit={handleLogin} style={{ minWidth: 320 }}>
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
              type="submit"
              onClick={() => setIsRegForm(false)}
              color={isRegForm ? 'inherit' : 'primary'}
            >
              Auth
            </Button>
            <Button
              type="submit"
              onClick={() => setIsRegForm(true)}
              color={isRegForm ? 'primary' : 'inherit'}
            >
              Register
            </Button>
          </ButtonGroup>
        </form>
      </Grid>
    </>
  );
};

export default Auth;