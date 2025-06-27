// import { Avatar, Button, Card, Chip } from '@mui/material'
// import React from 'react'
// import { useAuth } from '../../providers/useAuth'
// import { signOut } from 'firebase/auth'


// const User = () => {
//     const {user,ga} = useAuth()
//   return (
//     <Card
//     variant="outlined"
//     sx={{ 
//         padding: 2, 
//         backgroundColor: '#F1F7FA', 
//         border: 'none', 
//         borderRadius: 3,
//         marginBottom:5
//      }}
        
//     >
//     <Chip
//         avatar={<Avatar alt='' src={user?.avatar}/>}
//         label={user?.name || 'Без имени '}
//         variant='outlined'
//         sx={{display:'flex',marginBottom:2}}
//     />
//         <Button variant='outlined' onClick={() => signOut(ga)}>Выйти</Button>
//     </Card>
//   )
// }

// export default User


// src/layout/sidebar/User.tsx
import { Avatar, Button, Card, Chip } from '@mui/material'
import React from 'react'
import { useAuth } from '../../providers/useAuth' // Проверьте путь

const User = () => {
    const { user, signOut } = useAuth() // Получаем user и signOut

    console.log('Current user in User.tsx:', user); // Лог для отладки

    return (
        <Card
            variant="outlined"
            sx={{
                padding: 2,
                backgroundColor: '#F1F7FA',
                border: 'none',
                borderRadius: 3,
                marginBottom: 5
            }}
        >
            <Chip
                // Теперь user.avatar и user.name должны быть корректными благодаря AuthProvider
                avatar={<Avatar alt='' src={user?.avatar || ''}/>} // Добавил || '' для безопасности
                label={user?.name || user?.email || 'Без имени'} // Если имени нет, покажем email
                variant='outlined'
                sx={{
                    display: 'flex',
                    marginBottom: 2,
                }}
            />

            <Button
                variant='outlined'
                onClick={signOut}
                fullWidth
                sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: '#ffebee'
                    }
                }}
            >
                Выйти
            </Button>
        </Card>
    )
}

export default User