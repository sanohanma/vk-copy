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

import { Avatar, Button, Card, Chip, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useAuth } from '../../providers/useAuth'

const User = () => {
    const { user, signOut, switchUser, users } = useAuth()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleSwitchUser = (userId: string) => {
        switchUser(userId)
        handleClose()
    }

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
                avatar={<Avatar alt='' src={user?.avatar}/>}
                label={user?.name || 'Без имени'}
                variant='outlined'
                onClick={handleUserClick}
                sx={{
                    display: 'flex', 
                    marginBottom: 2,
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#e3f2fd'
                    }
                }}
            />
            
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {users?.map((u) => (
                    <MenuItem 
                        key={u.id} 
                        onClick={() => handleSwitchUser(u.id)}
                        selected={u.id === user?.id}
                    >
                        <Avatar src={u.avatar} sx={{ width: 24, height: 24, mr: 1 }} />
                        {u.name}
                    </MenuItem>
                ))}
            </Menu>

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